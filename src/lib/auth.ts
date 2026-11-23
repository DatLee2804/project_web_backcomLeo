import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "crypto";
import { cookies } from "next/headers";
import type { AuthProviderType, SessionUser, UserRole } from "@/types";

export const ADMIN_COOKIE_NAME = "leo_admin_session";
export const USER_COOKIE_NAME = "leo_user_session";
export const OAUTH_STATE_COOKIE = "leo_google_oauth_state";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "dev-only-fallback-secret-backcom-mr-leo-local"
  );
}

function safeCompareStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

// ============================================================================
// PASSWORD HASHING (Node built-in scrypt + 16-byte random salt)
// ============================================================================
export function hashPassword(plainPassword: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(plainPassword, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPasswordHash(
  plainPassword: string,
  storedHash: string | null | undefined
): boolean {
  if (!storedHash || !storedHash.includes(":")) return false;
  const [salt, keyHex] = storedHash.split(":");
  if (!salt || !keyHex) return false;
  const derivedHex = scryptSync(plainPassword, salt, 64).toString("hex");
  return safeCompareStrings(derivedHex, keyHex);
}

// ============================================================================
// ENV ADMIN CREDENTIALS CHECK
// ============================================================================
export function getAdminAuthStatus(): {
  configured: boolean;
  expectedUsername: string;
  expectedEmail: string;
  reason?: string;
} {
  const expectedUsername = (process.env.ADMIN_USERNAME || "admin").trim();
  const expectedEmail = (
    process.env.ADMIN_EMAIL || "admin@backcommrleo.com.vn"
  )
    .trim()
    .toLowerCase();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!password) {
    return {
      configured: false,
      expectedUsername,
      expectedEmail,
      reason:
        "Biến môi trường ADMIN_PASSWORD chưa được thiết lập trong .env.local (hoặc trên Vercel Environment Variables).",
    };
  }

  return { configured: true, expectedUsername, expectedEmail };
}

export function verifyAdminCredentials(
  identifier: string,
  password: string
): { valid: boolean; error?: string } {
  const status = getAdminAuthStatus();
  if (!status.configured) {
    return { valid: false, error: status.reason };
  }

  const cleanId = identifier.trim();
  const expectedPassword = (process.env.ADMIN_PASSWORD || "").trim();
  const matchesUsername = safeCompareStrings(cleanId, status.expectedUsername);
  const matchesEmail = safeCompareStrings(
    cleanId.toLowerCase(),
    status.expectedEmail
  );
  const passOk = safeCompareStrings(password, expectedPassword);

  if ((!matchesUsername && !matchesEmail) || !passOk) {
    return {
      valid: false,
      error: "Tài khoản hoặc mật khẩu không chính xác.",
    };
  }

  return { valid: true };
}

// ============================================================================
// SIGNED SESSION TOKENS (USER & ADMIN)
// ============================================================================
export function createUserSessionToken(user: SessionUser): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = Buffer.from(
    JSON.stringify({ ...user, exp }),
    "utf8"
  ).toString("base64url");

  const sig = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${sig}`;
}

export function verifyUserSessionToken(
  token: string | undefined | null
): SessionUser | null {
  if (!token || !token.includes(".")) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;

  const expectedSig = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");

  if (!safeCompareStrings(sig, expectedSig)) return null;

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as SessionUser & { exp?: number };

    if (
      !decoded.id ||
      !decoded.email ||
      typeof decoded.exp !== "number" ||
      decoded.exp < Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
      fullName: decoded.fullName,
      role: (decoded.role as UserRole) || "user",
      provider: (decoded.provider as AuthProviderType) || "credentials",
      avatarUrl: decoded.avatarUrl ?? null,
    };
  } catch {
    return null;
  }
}

export function createAdminSessionToken(username: string): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = Buffer.from(
    JSON.stringify({ sub: username, role: "admin", exp }),
    "utf8"
  ).toString("base64url");

  const sig = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(
  token: string | undefined | null
): { authenticated: boolean; username?: string } {
  if (!token || !token.includes(".")) {
    return { authenticated: false };
  }

  const [payload, sig] = token.split(".");
  if (!payload || !sig) return { authenticated: false };

  const expectedSig = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("base64url");

  if (!safeCompareStrings(sig, expectedSig)) {
    return { authenticated: false };
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { sub?: string; role?: string; exp?: number };

    if (
      decoded.role !== "admin" ||
      typeof decoded.exp !== "number" ||
      decoded.exp < Math.floor(Date.now() / 1000)
    ) {
      return { authenticated: false };
    }

    return { authenticated: true, username: decoded.sub };
  } catch {
    return { authenticated: false };
  }
}

export async function getCurrentUserSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const userToken = cookieStore.get(USER_COOKIE_NAME)?.value;
  const parsedUser = verifyUserSessionToken(userToken);
  if (parsedUser) return parsedUser;

  // Fallback if logged in via /admin/login cookie directly
  const adminToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const adminCheck = verifyAdminSessionToken(adminToken);
  if (adminCheck.authenticated) {
    const status = getAdminAuthStatus();
    return {
      id: "env-admin",
      email: status.expectedEmail,
      fullName: "Quản trị viên (Admin)",
      role: "admin",
      provider: "env-admin",
      avatarUrl: null,
    };
  }

  return null;
}

export async function getAdminSession(): Promise<{
  authenticated: boolean;
  username?: string;
}> {
  const cookieStore = await cookies();
  const rawAdmin = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const adminVerified = verifyAdminSessionToken(rawAdmin);
  if (adminVerified.authenticated) return adminVerified;

  // Also grant admin access if unified user session has role === "admin"
  const rawUser = cookieStore.get(USER_COOKIE_NAME)?.value;
  const userVerified = verifyUserSessionToken(rawUser);
  if (userVerified && userVerified.role === "admin") {
    return { authenticated: true, username: userVerified.email };
  }

  return { authenticated: false };
}

export function isGoogleOAuthConfigured(): boolean {
  const id = process.env.GOOGLE_CLIENT_ID?.trim();
  const secret = process.env.GOOGLE_CLIENT_SECRET?.trim();
  return Boolean(id && secret);
}

export const ADMIN_COOKIE_MAX_AGE = SESSION_TTL_SECONDS;

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  OAUTH_STATE_COOKIE,
  SESSION_TTL_SECONDS,
  USER_COOKIE_NAME,
  createAdminSessionToken,
  createUserSessionToken,
  getAdminAuthStatus,
  isGoogleOAuthConfigured,
} from "@/lib/auth";
import { upsertGoogleUser } from "@/lib/cms";
import type { SessionUser } from "@/types";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = url.origin;

  if (!isGoogleOAuthConfigured()) {
    return NextResponse.redirect(
      new URL("/login?oauth=pending_config", origin)
    );
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");

  if (oauthError || !code || !state) {
    return NextResponse.redirect(new URL("/login?oauth=cancelled", origin));
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get(OAUTH_STATE_COOKIE)?.value;
  if (!savedState || savedState !== state) {
    return NextResponse.redirect(new URL("/login?oauth=invalid_state", origin));
  }

  try {
    const redirectUri = `${origin}/api/auth/google/callback`;
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!.trim(),
        client_secret: process.env.GOOGLE_CLIENT_SECRET!.trim(),
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(
        new URL("/login?oauth=token_failed", origin)
      );
    }

    const tokenData = (await tokenRes.json()) as { access_token?: string };
    if (!tokenData.access_token) {
      return NextResponse.redirect(
        new URL("/login?oauth=token_failed", origin)
      );
    }

    const profileRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    if (!profileRes.ok) {
      return NextResponse.redirect(
        new URL("/login?oauth=profile_failed", origin)
      );
    }

    const profile = (await profileRes.json()) as {
      sub?: string;
      email?: string;
      name?: string;
      picture?: string;
    };

    if (!profile.email || !profile.sub) {
      return NextResponse.redirect(new URL("/login?oauth=no_email", origin));
    }

    const adminStatus = getAdminAuthStatus();
    const isDesignatedAdmin =
      profile.email.trim().toLowerCase() === adminStatus.expectedEmail;

    const appUser = await upsertGoogleUser({
      email: profile.email,
      fullName: profile.name || profile.email.split("@")[0],
      googleId: profile.sub,
      avatarUrl: profile.picture ?? null,
      forceAdmin: isDesignatedAdmin,
    });

    const sessionUser: SessionUser = {
      id: appUser.id,
      email: appUser.email,
      fullName: appUser.fullName,
      role: appUser.role,
      provider: "google",
      avatarUrl: appUser.avatarUrl ?? null,
    };

    const targetPath = appUser.role === "admin" ? "/admin" : "/account";
    const response = NextResponse.redirect(new URL(targetPath, origin));

    response.cookies.set({
      name: OAUTH_STATE_COOKIE,
      value: "",
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });

    response.cookies.set({
      name: USER_COOKIE_NAME,
      value: createUserSessionToken(sessionUser),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });

    if (appUser.role === "admin") {
      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: createAdminSessionToken(appUser.email),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_TTL_SECONDS,
      });
    }

    return response;
  } catch {
    return NextResponse.redirect(new URL("/login?oauth=server_error", origin));
  }
}

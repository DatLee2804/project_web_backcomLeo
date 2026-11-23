import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { OAUTH_STATE_COOKIE, isGoogleOAuthConfigured } from "@/lib/auth";

function getBaseOrigin(request: Request): string {
  const url = new URL(request.url);
  return url.origin;
}

export async function GET(request: Request) {
  const origin = getBaseOrigin(request);

  if (!isGoogleOAuthConfigured()) {
    return NextResponse.redirect(
      new URL("/login?oauth=pending_config", origin)
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID!.trim();
  const redirectUri = `${origin}/api/auth/google/callback`;
  const state = randomBytes(24).toString("hex");

  const googleAuthUrl = new URL(
    "https://accounts.google.com/o/oauth2/v2/auth"
  );
  googleAuthUrl.searchParams.set("client_id", clientId);
  googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "openid email profile");
  googleAuthUrl.searchParams.set("state", state);
  googleAuthUrl.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(googleAuthUrl);
  response.cookies.set({
    name: OAUTH_STATE_COOKIE,
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600,
  });

  return response;
}

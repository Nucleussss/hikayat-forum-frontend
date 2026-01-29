import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Get the full NextAuth JWT (includes your gateway token)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Check if the JWT contains a gateway token
  if (!token?.gatewayToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Forward request to your gateway with the JWT
  const gatewayRes = await fetch(`${process.env.GATEWAY_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token.gatewayToken}`
    }
  });

  if (!gatewayRes.ok) {
    return NextResponse.json({ error: "Failed" }, { status: gatewayRes.status });
  }

  const userData = await gatewayRes.json();
  return NextResponse.json(userData);
}
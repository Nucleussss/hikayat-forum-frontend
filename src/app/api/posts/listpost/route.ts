import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  // 1. Get Token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // 2. Extract Query Parameters from Frontend Request
  const searchParams = req.nextUrl.searchParams;
  const author_id = searchParams.get("author_id");
  const community_id = searchParams.get("community_id");
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  // 3. Construct Backend URL
  // We perform a fresh URL construction to safely handle the new params
  const backendUrl = new URL(`${process.env.GATEWAY_URL}/posts`);
  
  // Append params if they exist
  if (author_id) backendUrl.searchParams.append("author_id", author_id);
  if (community_id) backendUrl.searchParams.append("community_id", community_id);
  backendUrl.searchParams.append("page", page);
  backendUrl.searchParams.append("limit", limit);

  // 4. Forward Request
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

//5. Add Authorization Header if token exists
  if (token?.gatewayToken) {
    headers["Authorization"] = `Bearer ${token.gatewayToken}`;
  }

//6. Make Request to Backend
  try {
    const gatewayRes = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: headers,
    });

    // 7. Handle Response
    if (!gatewayRes.ok) {
       // handle error
       return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }

    const data = await gatewayRes.json();
    // console.log(NextResponse.json(data));
    return NextResponse.json(data);

  } catch {
    // 8. Handle Error
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
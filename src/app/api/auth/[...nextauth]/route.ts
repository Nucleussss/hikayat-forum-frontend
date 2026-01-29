// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";

// Create the auth handler
const handler = NextAuth(authOptions);

// Export as GET and POST
export { handler as GET, handler as POST };
// src/lib/auth.ts
import { getServerSession } from "next-auth";
import { authOptions } from "./auth-options";

// This works in Server Components
export async function getServerAuthSession() {
  return await getServerSession(authOptions);
}
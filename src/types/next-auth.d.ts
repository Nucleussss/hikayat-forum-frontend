import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User extends DefaultUser{
        id: string;
        email: string;
        name: string | null;
        gatewayToken: string;
    }

    interface Session extends DefaultSession{
        user: {
            id: string;
            email?: string | null;
            name?: string | null;    
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT{
        id: string;
        iat?: number;
        exp?: number;
        gatewayToken: string; // Add this field to store
    }
}
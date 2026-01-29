
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Hikayat Forum Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // check if the user exists in your database
                if (!credentials?.email || !credentials?.password) return null;
                
                try {
                    const res = await fetch(`${process.env.GATEWAY_URL}/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(credentials)
                    })

                    // parse the response data
                    const data = await res.json()

                    // check if the response is ok and contains a token
                    if (!data || !data.token) return null;

                    // check if the token is valid and return user details
                    if (res.ok && data.token) {
                        return {
                            id: data.id,
                            email: data.user.email || credentials.email,
                            name: data.user.name || null,
                            gatewayToken: data.token
                        };
                    }
                } catch (error) {
                    console.warn( "Auth error:", error )
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.gatewayToken = user.gatewayToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;        
            return session;
        }
    },
    pages: {
        signIn: "/login",        
    },
    cookies: {
        sessionToken: {
            name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production"
            }
        }
    }   
};

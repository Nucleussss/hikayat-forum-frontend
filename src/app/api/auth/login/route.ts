import { NextRequest, NextResponse } from 'next/server';

// Your gateway URL (from .env.local)
const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:8080';

export async function POST(req: NextRequest) {
    try {

        const body = await req.json();
        console.log("Login request body:", body);

        const res = await fetch(`${GATEWAY_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (res.ok) {
            const {token} = await res.json();
            
            console.log( "Login successful:", token )

            return NextResponse.json({ success: true });
        } else {
            const error = await res.json().catch(() => ({ message: 'Login failed' }));
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

    } catch (err: unknown) {
        console.error('Error during login:', err);

        if (err instanceof Error){
            return NextResponse.json({ error: err.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 })
        }
    }
}
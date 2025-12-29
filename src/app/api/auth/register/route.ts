// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Your gateway URL (from .env.local)
const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:8080';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Register request body:", body);

        const res = await fetch(`${GATEWAY_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            return NextResponse.json({ success: true });
        } else {
            const error = await res.json().catch(() => ({ message: 'Registration failed' }));
            return NextResponse.json({ error: error.message }, { status: res.status });
        }
    } catch (err: unknown) {
        console.error('Error during registration:', err);

        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 400 });
        } else {
            return NextResponse.json(
                { error: 'An unexpected error occurred' },{ status: 500 });
        }
    }
}
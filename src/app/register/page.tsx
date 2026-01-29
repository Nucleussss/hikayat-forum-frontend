// src/app/register/page.tsx
'use client'; // Required because we use useState and useEffect

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {            
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => router.push('/login'), 2000);
            } else {
                const errorData = await res.json().catch((err) => {
                    console.warn('failed to parse response as JSON', err)
                    return {}
                });
                setError(errorData.message || 'Registration failed. Please try again.');
            }
        } catch (err :unknown) {
        // check type of err before using instanceof Error
            if (err instanceof Error) {
                setError(`network error: ${err.message}`);
            }else{
                setError('Network error. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold text-green-600 mb-2">Success!</h2>
            <p className="text-gray-700">
            Your account has been created. Redirecting to login...
            </p>
        </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">Create Account</h1>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={
                        `w-full py-2 px-4 rounded-md text-white 
                        ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`
                    }
                    >
                    {loading ? 'Creating...' : 'Register'}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                    Log in
                </Link>
                </p>
            </div>
        </div>
    );
}
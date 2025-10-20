"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const supabase = createSupabaseBrowserClient();
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            console.log(data);
            router.push("/home");
        }
        catch (error: unknown) {
            setError(error instanceof Error ? error.message : "An error occurred");
        }
        setLoading(false);
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm space-y-6 rounded-2xl bg-white p-8 shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Welcome back!</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Please enter your details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <Link
                            href="/forgot-password"
                            className="text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button
                        type="submit"
                        disabled={loading}
                        className={cn("w-full", loading && "opacity-70 cursor-not-allowed")}>
                        {loading ? "Loggin in..." : "Login"}
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-600">
                    {"Don't have an account? "}
                    <Link href="/signup" className="text-blue-600 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginService } from "@/app/services/auth"

export default function LoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const res = await LoginService(email,password)
            console.log("response",res)

            if (!res.success) {
                throw new Error(data.message || "Login failed")
            }

            // ✅ Save token
            localStorage.setItem("token", res.token)

            // ✅ Redirect after login
            document.cookie = `token=${res.token}; path=/`
            router.push("/dashboard")

        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border">
                <h2 className="text-3xl font-bold text-center text-blue-600">
                    Login to QR Maker
                </h2>
                <p className="text-center text-gray-600 mt-2 mb-6">
                    Welcome back! Please log in to continue.
                </p>

                {error && (
                    <p className="text-red-600 text-center mb-4">
                        {error}
                    </p>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1 text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-medium mb-1 text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 text-gray-700 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <a
                        href="/auth/signup"
                        className="text-blue-600 font-semibold"
                    >
                        Sign Up
                    </a>
                </p>
            </div>
        </main>
    )
}

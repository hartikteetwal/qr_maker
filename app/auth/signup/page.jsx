"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SignUpService } from "@/app/services/auth"
import { setAuthUser } from "@/app/redux/authSlice"
import { useDispatch } from "react-redux"

export default function SignupPage() {
    const router = useRouter()
    const dispatch = useDispatch();


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    console.log("Name",name)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            const URL = process.env.API_URL
            const res = await SignUpService(name,email,password)

            if (!res.success) {
                throw new Error(data.message || "Signup failed")
            }

               // ✅ Save auth user in Redux + localStorage + cookie
                        dispatch(
                            setAuthUser({
                                token: res.token,
                                role: res.role,
                                userId: res.userId,
                                name:res.name
                            })
                        );
            
                        router.push("/dashboard");
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
                    Create Account
                </h2>
                <p className="text-center text-gray-600 mt-2 mb-6">
                    Join QR Maker in seconds.
                </p>

                {error && (
                    <p className="text-red-600 text-center mb-4">
                        {error}
                    </p>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label className="block font-medium mb-1 text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 border rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

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
                            minLength={6}
                            placeholder="Create a password"
                            className="w-full px-4 py-3 border rounded-lg text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold disabled:opacity-60"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a
                        href="/auth/login"
                        className="text-blue-600 font-semibold"
                    >
                        Login
                    </a>
                </p>
            </div>
        </main>
    )
}

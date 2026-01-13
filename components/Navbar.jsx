"use client"

import { usePathname, useRouter } from "next/navigation"

const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()

    // Read token from cookie (client-side)
    const token =
        typeof document !== "undefined" &&
        document.cookie.includes("token=")

    const handleLogout = () => {
        document.cookie = "token=; path=/; max-age=0"
        router.push("/auth/login")
    }

    return (
        <header className="w-full py-4 bg-white shadow-sm">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
                <a href="/" className="text-2xl font-bold text-blue-600">
                    QRM
                </a>

                <nav className="flex items-center gap-6 text-gray-700">
                    <a href="/generate" className="hover:text-blue-600">
                        Generate QR
                    </a>
                    <a href="/dashboard" className="hover:text-blue-600">
                        Dashboard
                    </a>
                    <a href="/history" className="hover:text-blue-600">
                        History
                    </a>

                    {!token ? (
                        <a
                            href="/auth/login"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Login
                        </a>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            Logout
                        </button>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar

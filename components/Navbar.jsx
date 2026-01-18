"use client"

import { loadAuthUser, logout } from "@/app/redux/authSlice"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

const Navbar = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const authUser = useSelector((state) => state.auth.authUser)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    dispatch(loadAuthUser())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logout())
    router.push("/auth/login")
  }

  const firstLetter = authUser?.name?.charAt(0).toUpperCase()

  return (
    <header className="w-full py-4 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          QRM
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          {!authUser ? (
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Login
            </Link>
          ) : (
            <>
              <Link href="/generate">Generate QR</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/history">History</Link>
              <Link href="/upi">UPI</Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white cursor-pointer font-semibold flex items-center justify-center"
                >
                  {firstLetter}
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </nav>

        {/* Mobile Profile Dropdown */}
        {authUser && (
          <div className="md:hidden relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-blue-600 text-white cursor-pointer font-semibold flex items-center justify-center"
            >
              {firstLetter}
            </button>

            {open && (
              <div className="absolute right-0 text-gray-700 mt-2 w-48 cursor-pointer bg-white border rounded-lg shadow-md">
                <Link
                  href="/generate"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Generate QR
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <Link
                  href="/history"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  History
                </Link>
                <Link
                  href="/upi"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Upi
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar

"use client";
import { useState } from "react";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);

    const [loginData, setLoginData] = useState({ email: "", password: "" });

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3E2C7] px-4">
            <div className="w-full max-w-6xl bg-[#FFF8F0] rounded-2xl shadow-2xl border border-[#E7D2BA] flex flex-col md:flex-row overflow-hidden">

                {/* LEFT SIDE — SHOW ONLY ON DESKTOP */}
                <div className="hidden md:flex w-2/3 bg-[#5A3E36] flex-col justify-center items-center p-10 text-[#FFF8F0]">
                    <h1 className="text-4xl font-bold mb-4">Welcome to QR Maker</h1>
                    <p className="text-lg mb-6 text-center opacity-90">
                        Generate your secure UPI payment QR instantly.
                        Fast • Safe • Easy
                    </p>

                    <img
                        src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
                        alt="QR Icon"
                        className="w-40 opacity-90"
                    />
                </div>

                {/* RIGHT SIDE — FORM */}
                <div className="w-full md:w-1/3 p-8">
                    {/* Title */}
                    <h2 className="text-3xl font-bold text-center mb-6 text-[#5A3E36]">
                        {isLogin ? "Login" : "Create Account"}
                    </h2>

                    {/* LOGIN FORM */}
                    {isLogin && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("Login Data:", loginData);
                            }}
                            className="space-y-5"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1 text-[#3B2F2F]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={(e) =>
                                        setLoginData({ ...loginData, email: e.target.value })
                                    }
                                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#8B5E3C] bg-[#FFF8F0]"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-[#3B2F2F]">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={(e) =>
                                        setLoginData({ ...loginData, password: e.target.value })
                                    }
                                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#8B5E3C] bg-[#FFF8F0]"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl font-semibold bg-[#5A3E36] hover:bg-[#8B5E3C] text-[#FFF8F0] transition"
                            >
                                Login
                            </button>
                        </form>
                    )}

                    {/* SIGNUP FORM */}
                    {!isLogin && (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("Signup Data:", signupData);
                            }}
                            className="space-y-5"
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1 text-[#3B2F2F]">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, name: e.target.value })
                                    }
                                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#8B5E3C] bg-[#FFF8F0]"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-[#3B2F2F]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, email: e.target.value })
                                    }
                                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#8B5E3C] bg-[#FFF8F0]"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 text-[#3B2F2F]">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={(e) =>
                                        setSignupData({ ...signupData, password: e.target.value })
                                    }
                                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#8B5E3C] bg-[#FFF8F0]"
                                    placeholder="Create password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl font-semibold bg-[#8B5E3C] hover:bg-[#5A3E36] text-[#FFF8F0] transition"
                            >
                                Create Account
                            </button>
                        </form>
                    )}

                    {/* Toggle Link */}
                    <p className="text-center mt-6 text-sm text-[#3B2F2F]">
                        {isLogin ? (
                            <>
                                Don’t have an account?{" "}
                                <button
                                    onClick={() => setIsLogin(false)}
                                    className="text-[#8B5E3C] font-semibold"
                                >
                                    Create Account
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button
                                    onClick={() => setIsLogin(true)}
                                    className="text-[#8B5E3C] font-semibold"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

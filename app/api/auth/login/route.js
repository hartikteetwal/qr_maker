import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import User from "@/app/utils/userModel";
import { connectDB } from "@/app/utils/db";

export async function POST(req) {
    await connectDB()
    const payload = await req.json()
    console.log("payload.email", payload.email)

    if (!payload.email || !payload.password) return NextResponse.json({ success: false, message: "All fields are required" })

    if (payload.email === process.env.ADMIN_EMAIL && payload.password === process.env.ADMIN_PASSWORD) {

        const token = jwt.sign({ email: payload.password }, process.env.SECRET_KEY)
        return NextResponse.json({ success: true, message: "Login successfully", token: token, role: "admin"})
    } else {
        
        const user = await User.findOne({ email: payload.email })

        if (!user) return NextResponse.json({ success: false, message: "User not found" })

        const isMatched = await bcrypt.compare(payload.password, user.password)
        if (!isMatched) return NextResponse.json({ success: false, message: "Invalid credential" })

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)


        return NextResponse.json({ success: true, message: "Login successfully", token: token, role: "user", userId: user._id ,name:user.name})
    }

}

import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import userModal from "../../../lib/userModal";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

export async function POST(req) {
    try {
        await connectDB();

        const { email, password } = await req.json();
        const user = await userModal.findOne({ email });
        console.log(email, password, "email, password")
        if (!password.length>=8) {
            return NextResponse.json({ success: false, message: "Password must be greator 8 charactor", status: 404 
})
        }
        if (!user)
            return NextResponse.json({success:false, message: "User not found" ,status: 404 });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return NextResponse.json(
                {success:false, message: "Invalid password" , status: 401 }
            );
        
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)

        return NextResponse.json({ success: true, message: "Login successful", user, token });
    } catch (error) {
        return NextResponse.json({success:false, error: "Server error" ,status: 500 });
    }
}

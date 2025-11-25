import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import userModal from "../../../lib/userModal";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'

export async function POST(req) {
    try {
        await connectDB();
        const { name, email, password } = await req.json();

        const existingUser = await userModal.findOne({ email });
        if (existingUser)
            return NextResponse.json(
                {
                success:false,
            message: "Email already exists" ,status: 400 }
            );

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = await userModal.create({ name, email, password: hashedPassword });
        const token = jwt.sign({ userId: newUser._id },process.env.SECRET_KEY)

        return NextResponse.json({success:true, message: "User created successfully" ,token});
    } catch (error) {
        return NextResponse.json({ success:false,error: "Server error" , status: 500 });
    }
}

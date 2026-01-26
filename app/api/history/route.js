import { connectDB } from "@/app/utils/db"
import QrModel from "@/app/utils/qr";
import reuseQrModel from "@/app/utils/reuse_qr";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const qrId = searchParams.get("qr_id")
    console.log("qrId:", qrId)

    const authUser = req.cookies.get("authUser")?.value;

let user_id = null;

if (authUser) {
  const parsedUser = JSON.parse(authUser); // 🔥 IMPORTANT
  user_id = parsedUser.userId;
}

    if (!user_id) {
      return NextResponse.json(
        { message: "user_id is required" },
        { status: 400 }
      )
    }

    if(qrId){
      const useQrList = await reuseQrModel.find({ qr_id: qrId }).sort({ createdAt: -1 })
      const [{qr_code_image}] = await QrModel.find({ _id: qrId }).sort({ createdAt: -1 })
console.log("Fetched reuse QR list for qrId:", qrId, useQrList);
    return NextResponse.json(
      { success: true, data: useQrList, qr_code_image },
      { status: 200 }
    )
    }else{

      const upiList = await QrModel.find({ user_id }).sort({ createdAt: -1 })
      
      return NextResponse.json(
        { success: true, data: upiList },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error("GET UPI ERROR:", error)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}
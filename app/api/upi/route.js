import { connectDB } from "@/app/utils/db";
import UpiModel from "@/app/utils/upi";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB()

    const body = await req.json()
    const { upi_id, user_id, upi_name } = body

    console.log("Received UPI data:", body)

    // Validation
    if (!upi_id || !user_id || !upi_name) {
      return NextResponse.json(
        { message: "upi_id, user_id and upi_name are required." },
        { status: 400 }
      )
    }

    // ✅ Check if this is first UPI for user
    const upiCount = await UpiModel.countDocuments({ user_id })

    const status = upiCount === 0 ? 1 : 0

    // ✅ Create UPI
    const newUpi = await UpiModel.create({
      upi_id,
      user_id,
      upi_name,
      status,
    })

    return NextResponse.json(
      {
        success: true,
        message: "UPI created successfully",
        data: newUpi,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating UPI:", error)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}
export async function GET(req) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get("user_id")
    console.log("Fetching UPI for user_id:", user_id)

    if (!user_id) {
      return NextResponse.json(
        { message: "user_id is required" },
        { status: 400 }
      )
    }

    const upiList = await UpiModel.find({ user_id }).sort({ createdAt: -1 })

    return NextResponse.json(
      { success: true, data: upiList },
      { status: 200 }
    )
  } catch (error) {
    console.error("GET UPI ERROR:", error)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}
export async function DELETE(req) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const upi_id = searchParams.get("upi_id")
    console.log("Fetching UPI for upi_id:", upi_id)

    if (!upi_id) {
      return NextResponse.json(
        { message: "upi_id is required" },
        { status: 400 }
      )
    }

    const upiList = await UpiModel.deleteOne({ _id: upi_id })

    return NextResponse.json(
      { success: true, data: upiList },
      { status: 200 }
    )
  } catch (error) {
    console.error("GET UPI ERROR:", error)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}
export async function PUT(req) {
  try {
    await connectDB()

    // ✅ body read correctly
    const body = await req.json()
    const { source, user_id } = body
    const userObjectId = new mongoose.Types.ObjectId(user_id)


    // ✅ query params
    const { searchParams } = new URL(req.url)
    const upi_id = searchParams.get("upi_id")

    console.log("Updating UPI:", { upi_id, source, user_id })

    if (!upi_id || !user_id) {
      return NextResponse.json(
        { success: false, message: "upi_id and user_id required" },
        { status: 400 }
      )
    }

    // ✅ only one UPI active
    if (source === "status") {
      await UpiModel.updateMany(
        { user_id :userObjectId},
        { $set: { status: 0 } }
      )

      await UpiModel.updateOne(
        { _id:upi_id },
        { $set: { status: 1 } }
      )
    }else{
      const upi_name = body.upi_name;
      console.log("Updating UPI details:", { upi_name, upi_id });
      await UpiModel.updateOne(
        { _id:upi_id },
        { $set: { upi_name, upi_id: body.upi_id } }
      )
    }

    

    return NextResponse.json(
      { success: true, message: "Status updated successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("PUT UPI ERROR:", error)
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    )
  }
}

import { connectDB } from "@/app/utils/db";
import QrModel from "@/app/utils/qr";
import reuseQrModel from "@/app/utils/reuse_qr";
import UpiModel from "@/app/utils/upi";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {user_id,qr_id } = body;

    // Validation
    if (!user_id || ! qr_id) {
      return new Response(
        JSON.stringify({ message: "user_id are required." }),
        { status: 400 }
      );
    }

    const activeUpi =await UpiModel.findOne({user_id,status:1})
    if(!activeUpi){
      return new Response(
        JSON.stringify({ message: "Add Upi Id" }),
        { status: 400 }
      );
    }

    await reuseQrModel.create({ qr_id: qr_id, user_id, upi_Id: activeUpi.upi_id, upi_name: activeUpi.upi_name });
      await QrModel.findByIdAndUpdate(
          qr_id,
          { $inc: { used_count: 1 } },
          { new: true }
      );


    return new Response(
      JSON.stringify({
          message: "QR code reuse successfully",
          success:true
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating QR code:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message ,success:false}),
      { status: 500 }
    );
  }
}
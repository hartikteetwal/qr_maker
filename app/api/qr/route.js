import { connectDB } from "@/app/utils/db";
import QrModel from "@/app/utils/qr";
import reuseQrModel from "@/app/utils/reuse_qr";
import UpiModel from "@/app/utils/upi";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { value, user_id } = body;

    // Validation
    if (!value || !user_id) {
      return new Response(
        JSON.stringify({ message: "Value and user_id are required." }),
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


    const upiURL = `upi://pay?pa=${activeUpi.upi_id}&pn=${encodeURIComponent(activeUpi.upi_name)}&am=${value}&cu=INR`;
    const qr_code_image = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(upiURL);
console.log("qr_code_image",qr_code_image)
    // Create QR code
    const newQr = await QrModel.create({ value, user_id, upi_Id: activeUpi.upi_id, upi_name: activeUpi.upi_name, qr_code_image, used_count: 1 });
    await reuseQrModel.create({ qr_id: newQr._id, user_id, upi_Id: activeUpi.upi_id, upi_name: activeUpi.upi_name });

    return new Response(
      JSON.stringify({
        message: "QR code created successfully",
        qrCode: newQr,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating QR code:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}
export async function GET(req) {
  try {
    await connectDB();
    
    
  } catch (error) {
    console.error("Error creating QR code:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { upi_id, user_id,upi_name } = body;
    console.log("Received UPI data:", body);

    // Validation
    if (!upi_id || !user_id || !upi_name) {
      return new Response(
        JSON.stringify({ message: "upi_id, user_id and upi_name are required." }),
        { status: 400 }
      );
    }

    // Create QR code
    const newQr = await UpiModel.create({ upi_id, user_id, upi_name, status: 0 });

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

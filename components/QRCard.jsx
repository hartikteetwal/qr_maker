import React from 'react'

export const QRCard = ({qrData, setAmount, setQrData}) => {
       const downloadQR = () => {
        const link = document.createElement("a");
        link.href = qrData?.qr_code_image;
        link.download = `upi-qr-${qrData.value}.png`;
        link.click();
    };
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
                            ✅ QR Generated Successfully
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            ₹{qrData.value}
                        </h2>

                        <p className="text-gray-500 mb-6">
                            Scan & Pay using any UPI App
                        </p>

                        <img
                            src={qrData?.qr_code_image}
                            alt="QR Code"
                            className="mx-auto w-56 h-56 rounded-xl border shadow mb-6"
                        />

                        <div className="space-y-3">
                            <button
                                onClick={()=>downloadQR()}
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                            >
                                Download QR
                            </button>

                            <button
                                onClick={() => {
                                    setQrData([]);
                                    setAmount("");
                                }}
                                className="w-full border text-green-700 border-gray-300 hover:bg-gray-100 py-3 rounded-lg"
                            >
                                Generate New QR
                            </button>
                        </div>
                    </div>
  )
}

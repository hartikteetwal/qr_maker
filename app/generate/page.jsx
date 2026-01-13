"use client";

import { useState } from "react";

export default function GenerateQRPage() {
    const [amount, setAmount] = useState("");
    const [qrSrc, setQrSrc] = useState("");

    const generateQR = async () => {
        if (!amount) return alert("Please enter amount");

        try {
            const res = await fetch("/api/qr", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });

            const data = await res.json();

            if (data?.qrImage) {
                setQrSrc(data.qrImage);
            }
        } catch (err) {
            console.log(err);
            alert("Error generating QR");
        }
    };

    const downloadQR = () => {
        if (!qrSrc) return;

        const link = document.createElement("a");
        link.href = qrSrc;
        link.download = `qr-${amount}.png`;
        link.click();
    };

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Generate UPI QR Code
                </h1>

                <div className="bg-white p-6 rounded-xl shadow border">

                    {/* Amount Input */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Enter Amount (₹)
                    </label>

                    <input
                        type="number"
                        className="w-full border rounded-lg px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter amount e.g. 250"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    {/* Generate Button */}
                    <button
                        onClick={generateQR}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-medium"
                    >
                        Generate QR
                    </button>

                    {/* QR Preview */}
                    {qrSrc && (
                        <div className="mt-8 text-center">
                            <p className="font-medium text-gray-700 mb-4">
                                Your QR Code is ready
                            </p>

                            <img
                                src={qrSrc}
                                alt="QR Code"
                                className="mx-auto w-60 h-60 rounded-lg border shadow"
                            />

                            <button
                                onClick={downloadQR}
                                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                            >
                                Download QR
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

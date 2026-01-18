"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { changeActiveUpi, fetchUpiList, GenerateQR } from "../services/api";

export default function GenerateQRPage() {
    const [amount, setAmount] = useState("");
    const [qrSrc, setQrSrc] = useState("");
    const [upiList, setUpiList] = useState([]);
    const [selectedUpi, setSelectedUpi] = useState(null);

    const authUser = useSelector((state) => state.auth.authUser);
    const router = useRouter();

    // Fetch UPI List
    const fetchUpi = async () => {
        try {
            const res = await fetchUpiList(authUser?.userId);
            if (res.success) {
                setUpiList(res.data);

                // Preselect UPI with status=1
                const activeUpi = res.data.find((u) => u.status === 1);
                setSelectedUpi(activeUpi || null);
            }
        } catch (error) {
            console.error("Error fetching UPI list:", error);
        }
    };

    useEffect(() => {
        if (authUser?.userId) {
            fetchUpi();
        }
    }, [authUser]);

    // Handle UPI change
    const handleUpiChange = async (upiId) => {
        setSelectedUpi(upiList.find((u) => u.id === upiId));

        try {
            await changeActiveUpi(upiId, authUser.userId); // API call to change status by ID
            // Refetch UPI list after status change
            fetchUpi();
        } catch (err) {
            console.error("Error changing active UPI:", err);
        }
    };

    // Generate QR
    const generateQR = async () => {
        if (!amount) return alert("Please enter amount");
        if (!selectedUpi) return alert("Please select a UPI");

        try {
            const res = await GenerateQR({
                value: amount,
                user_id: authUser.userId,
            });
            if (res?.qr_code_image) setQrSrc(res.qr_code_image);
        } catch (err) {
            console.log(err);
            alert("Error generating QR");
        }
    };

    // Download QR
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

                {/* Title + UPI Selection */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Generate UPI QR Code
                    </h1>

                    {upiList.length === 0 ? (
                        <button
                            onClick={() => router.push("/upi")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            Add UPI
                        </button>
                    ) : (
                        <select
                            value={selectedUpi?._id || ""}
                            onChange={(e) => handleUpiChange(e.target.value)}
                            className="border rounded-lg px-4 py-2 focus:ring-2 text-gray-700 focus:ring-blue-500 outline-none"
                        >
                            {!upiList.some((u) => u.status === 1) && (
                                <option value="">Select UPI</option>
                            )}
                            {upiList.map((upi) => (
                                <option key={upi._id} value={upi._id}>
                                    {upi.upi_name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                <div className="bg-white p-6 rounded-xl shadow border">
                    {/* Amount Input */}
                    <label className="block mb-2 font-medium text-gray-700">
                        Enter Amount (₹)
                    </label>

                    <input
                        type="number"
                        className="w-full border rounded-lg px-4 text-gray-700 py-3 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
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

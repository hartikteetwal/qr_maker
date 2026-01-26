"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { changeActiveUpi, fetchUpiList, GenerateQR } from "../services/api";
import { QRCard } from "@/components/QRCard";

export default function GenerateQRPage() {
    const [amount, setAmount] = useState("");
    const [upiList, setUpiList] = useState([]);
    const [selectedUpi, setSelectedUpi] = useState(null);
    const [qrData, setQrData] = useState([]);

    const authUser = useSelector((state) => state.auth.authUser);
    const router = useRouter();

    // Fetch UPI list
    const fetchUpi = async () => {
        const res = await fetchUpiList(authUser?.userId);
        if (res.success) {
            setUpiList(res.data);
            const activeUpi = res.data.find((u) => u.status === 1);
            setSelectedUpi(activeUpi || null);
        }
    };

    useEffect(() => {
        if (authUser?.userId) fetchUpi();
    }, [authUser]);

    const handleUpiChange = async (upiId) => {
        const upi = upiList.find((u) => u._id === upiId);
        setSelectedUpi(upi);

        await changeActiveUpi(upiId, authUser?.userId);
        fetchUpi();
    };

    const generateQR = async () => {
        if (!amount) return alert("Enter amount");
        if (!selectedUpi) return alert("Select UPI");

        const res = await GenerateQR({
            value: amount,
            user_id: authUser?.userId,
        });

        if (res?.qrCode) {
            setQrData(res.qrCode);
        }
    };


    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
            <div className="w-full max-w-xl">

                {qrData.length===0 ? (
                    /* -------- Generate QR Card -------- */
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                            Generate UPI QR Code
                        </h1>

                        {upiList.length === 0 ? (
                            <button
                                onClick={() => router.push("/upi")}
                                className="w-full bg-blue-600 mb-4 cursor-pointer hover:bg-blue-700 text-gray-100 py-3 rounded-lg"
                            >
                                Add UPI
                            </button>
                        ) : (
                            <select
                                value={selectedUpi?._id || ""}
                                onChange={(e) => handleUpiChange(e.target.value)}
                                    className="w-full mb-4 border rounded-lg px-4 text-gray-700 py-3"
                            >
                                    <option value="" className="text-gray-700">Select UPI</option>
                                {upiList.map((upi) => (
                                    <option className="text-gray-700" key={upi._id} value={upi._id}>
                                        {upi.upi_name}
                                    </option>
                                ))}
                            </select>
                        )}

                        <input
                            type="number"
                            placeholder="Enter Amount (₹)"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 mb-4 text-gray-700"
                        />

                        <button
                            onClick={generateQR}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg"
                        >
                            Generate QR
                        </button>
                    </div>
                ) : (
                    /* -------- QR Result Card -------- */
                    <QRCard qrData={qrData} setAmount={setAmount} setQrData={setQrData}/>
                )}
            </div>
        </main>
    );
}

"use client";

import { useEffect, useState } from "react";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await fetch("/api/qr");
            const data = await res.json();
            setHistory(data.history || []);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    QR History
                </h1>

                {/* If no history */}
                {history.length === 0 && (
                    <p className="text-gray-600 text-center mt-20 text-lg">
                        No QR history found.
                    </p>
                )}

                {/* Desktop Table */}
                <div className="hidden md:block">
                    <table className="w-full bg-white shadow rounded-lg overflow-hidden border">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left font-medium text-gray-700">Amount</th>
                                <th className="p-3 text-left font-medium text-gray-700">Date</th>
                                <th className="p-3 text-left font-medium text-gray-700">Status</th>
                                <th className="p-3 text-right font-medium text-gray-700">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {history.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-3">₹{item.amount}</td>
                                    <td className="p-3">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${item.status === "completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right">
                                        <a
                                            href={`/qr/${item.id}`}
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            View →
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {history.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-4 rounded-lg shadow border"
                        >
                            <p className="text-lg font-medium text-gray-800">
                                ₹{item.amount}
                            </p>
                            <p className="text-gray-600 text-sm mt-1">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </p>

                            <span
                                className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${item.status === "completed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {item.status}
                            </span>

                            <a
                                href={`/qr/${item.id}`}
                                className="block mt-3 text-blue-600 hover:underline"
                            >
                                View QR →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

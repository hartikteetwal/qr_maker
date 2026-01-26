"use client";

import { useEffect, useState } from "react";
import { fetchUpiHistory } from "../services/api";
import { HistoryCardTable } from "@/components/HistoryCardTable";

export default function HistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await fetchUpiHistory();
            console.log("Fetched history data:", res.data);
            setHistory(res.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        QR History
                    </h1>
                    <p className="text-gray-600 mt-1">
                        All generated QR codes and their usage
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <p className="text-center text-gray-500 mt-20">
                        Loading history...
                    </p>
                )}

                {/* Empty State */}
                {!loading && history.length === 0 && (
                    <div className="text-center mt-24">
                        <p className="text-xl text-gray-600">
                            No QR history found
                        </p>
                        <p className="text-gray-500 mt-2">
                            Generate a QR to see it here.
                        </p>
                    </div>
                )}

<HistoryCardTable history={history} />
            </div>
        </main>
    );
}

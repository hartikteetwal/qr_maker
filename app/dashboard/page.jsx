'use client'
import { useEffect,useState } from "react";
import { changeActiveUpi, fetchUpiHistory, fetchUpiList } from "../services/api";
import { HistoryCardTable } from "@/components/HistoryCardTable";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";


export default function DashboardPage() {
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(true);
    const [selectedUpi, setSelectedUpi] = useState(null);
    const router = useRouter();

    const [upiList, setUpiList] = useState([]);
       const authUser = useSelector((state) => state.auth.authUser);
        
        useEffect(() => {
            fetchHistory();
            fetchUpi();
        }, []);


    // Fetch UPI list
    const fetchUpi = async () => {
        const res = await fetchUpiList(authUser?.userId);
        if (res.success) {
            setUpiList(res.data);
            const activeUpi = res.data.find((u) => u.status === 1);
            setSelectedUpi(activeUpi || null);
        }
    };

    const handleUpiChange = async (upiId) => {
            const upi = upiList.find((u) => u._id === upiId);
            setSelectedUpi(upi);
    
            await changeActiveUpi(upiId, authUser?.userId);
            fetchUpi();
        };

    useEffect(() => {
        if (authUser?.userId) fetchUpi();
    }, [authUser]);

        const fetchHistory = async () => {
            try {
                const res = await fetchUpiHistory();
                console.log("Fetched history data:", res.data);
                setHistory(res.data || []);
            } catch (err) {
                console.error(err);
            } finally {
                setHistoryLoading(false);
            }
        };
    return (
        <main className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Dashboard
                </h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

                    {/* Total QRs */}
                    <div className="bg-white p-6 shadow rounded-xl border">
                        <h2 className="text-gray-600 font-medium">Total QRs</h2>
                        <p className="text-3xl font-bold text-blue-600 mt-2">128</p>
                    </div>

                    {/* Payments Today */}
                    <div className="bg-white p-6 shadow rounded-xl border">
                        <h2 className="text-gray-600 font-medium">Payments Today</h2>
                        <p className="text-3xl font-bold text-green-600 mt-2">₹3,250</p>
                    </div>

                    {/* Total Transactions */}
                    <div className="bg-white p-6 shadow rounded-xl border">
                        <h2 className="text-gray-600 font-medium">Total Transactions</h2>
                        <p className="text-3xl font-bold text-purple-600 mt-2">412</p>
                    </div>

                    {/* UPI Status */}
                    <div className="bg-white p-6 shadow rounded-xl border">
                        <h2 className="text-gray-600 font-medium">UPI Status</h2>
                        <p className="text-3xl font-bold text-orange-500 mt-2">Active</p>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white p-6 rounded-xl border shadow">
                    <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Recent QR History
                    </h2>
                    <div className="w-50">
                        
                        {upiList.length === 0 ? (
                            <button
                                onClick={() => router.push("/upi")}
                                className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-gray-100 py-3 rounded-lg"
                            >
                                Add UPI
                            </button>
                        ) : (
                            <select
                                value={selectedUpi?._id || ""}
                                onChange={(e) => handleUpiChange(e.target.value)}
                                    className="w-full mb-4 border rounded-lg px-4 text-gray-700 py-2"
                            >
                                    <option value="" className="text-gray-700">Select UPI</option>
                                {upiList.map((upi) => (
                                    <option className="text-gray-700" key={upi._id} value={upi._id}>
                                        {upi.upi_name}
                                    </option>
                                ))}
                            </select>
                        )}

                    </div>
                    </div>
                    <HistoryCardTable history={history} />
                </div>

            </div>
        </main>
    );
}

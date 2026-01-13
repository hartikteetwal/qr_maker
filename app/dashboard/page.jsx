export default function DashboardPage() {
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
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Recent QR History
                    </h2>

                    <div className="divide-y">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="font-medium text-gray-800">₹{item * 250}</p>
                                    <p className="text-sm text-gray-600">
                                        Payment • {new Date().toLocaleDateString()}
                                    </p>
                                </div>

                                <a
                                    href={`/qr/${item}`}
                                    className="text-blue-600 font-medium hover:underline"
                                >
                                    View →
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}

    import { fetchUseHistory } from '@/app/services/api';
import { useRouter } from 'next/navigation';
    import React, { useState } from 'react'

    export const HistoryCardTable = ({ history }) => {
        const [useHistory,setUseHistory] =useState([])
            const [open, setOpen] = useState(false)
            const router = useRouter()
      const showHistory = async (item) => {
        const res = await fetchUseHistory(item._id)
        setUseHistory(res.data || [])
        setOpen(true)
    }
        console.log("Use history data:", useHistory);
    return (
        <div>
                    {/* ================= Desktop Table ================= */}
                    <div className="hidden md:block">
                        {history.length > 0 ? (
                            <div className="bg-white rounded-xl shadow border overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-4 text-left text-gray-700 font-medium">
                                                QR
                                            </th>
                                            <th className="p-4 text-left text-gray-700 font-medium">
                                                Amount
                                            </th>
                                            <th className="p-4 text-left text-gray-700 font-medium">
                                                Used
                                            </th>
                                            <th className="p-4 text-left text-gray-700 font-medium">
                                                Created
                                            </th>
                                            <th className="p-4 text-right text-gray-700 font-medium">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {history.map((item) => (
                                            <tr
                                                key={item._id}
                                                className="border-t hover:bg-gray-50 transition"
                                            >
                                                <td className="p-4">
                                                    <img
                                                        src={item.qr_code_image}
                                                        alt="QR"
                                                        className="w-16 h-16 rounded border"
                                                    />
                                                </td>

                                                <td className="p-4 font-semibold text-gray-800">
                                                    ₹{item.value}
                                                </td>

                                                <td className="p-4">
                                                    <span className="px-3 py-1 cursor-pointer rounded-full text-sm bg-indigo-100 text-indigo-700" onClick={()=>showHistory(item)}>
                                                        {item.used_count} times
                                                    </span>
                                                </td>

                                                <td className="p-4 text-gray-600">
                                                    {new Date(item.createdAt).toLocaleString()}
                                                </td>

                                                <td className="p-4 text-right">
                                                    <a
                                                        href={item.qr_code_image}
                                                        target="_blank"
                                                        className="text-indigo-600 hover:underline font-medium"
                                                    >
                                                        View QR →
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ):(
                            <div className='w-full flex items-center justify-center'>
                            <button
                                onClick={() => router.push("/generate")}
                                className="w-50 bg-blue-600 hover:bg-blue-700 cursor-pointer text-gray-100 py-3 rounded-lg"
                                >
                                Generate QR
                            </button>
                                </div>
                        )}
                    </div>

                  {open && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                    <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">
                        
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-600">
                                Usage History
                            </h2>
                            <button
                                onClick={() => setOpen(false)}
                                className="text-gray-700 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        {useHistory.length === 0 ? (
                            <p className="text-center text-gray-600">
                                No usage found
                            </p>
                        ) : (
                            <div className="space-y-3 max-h-72 overflow-y-auto">
                                {useHistory.map((u, i) => (
                                    <div
                                        key={u._id}
                                        className="border rounded-lg p-3 flex justify-between"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-600">
                                                {u.upi_name}
                                            </p>
                                            <p className="text-[12px] text-gray-500">
                                                UPI ID: {u.upi_Id}
                                            </p>
                                        </div>
                                        <span className="">
                                            <p className='text-sm text-indigo-600 font-semibold text-end'>
                                            #{i + 1}
                                            </p>
                                            <p className="text-[12px] text-gray-500">
                                                Used at {new Date(u.createdAt).toLocaleString()}
                                            </p>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                        </div>
                  </div>
    )
    }


                    {/* ================= Mobile Cards ================= */}
                    <div className="md:hidden space-y-4">
                        {history.length>0&&history.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-xl shadow border p-4 flex gap-4"
                            >
                                <img
                                    src={item.qr_code_image}
                                    alt="QR"
                                    className="w-20 h-20 rounded border flex-shrink-0"
                                />

                                <div className="flex-1">
                                    <p className="text-lg font-semibold text-gray-800">
                                        ₹{item.value}
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>

                                    <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700 cursor-pointer" onClick={()=>showHistory(item)}>
                                        Used {item.used_count} times
                                    </span>

                                    <a
                                        href={item.qr_code_image}
                                        target="_blank"
                                        className="block mt-3 text-indigo-600 hover:underline text-sm font-medium"
                                    >
                                        View QR →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
    )
    }

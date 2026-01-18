"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { addUpiId, deleteUpiId, fetchUpiList } from "../services/api"
import Toggle from "@/components/Toggle"

const UpiPage = () => {
  const authUser = useSelector((state) => state.auth.authUser)

  const [form, setForm] = useState({
    upi_name: "",
    upi_id: ""
  })

  const [upiList, setUpiList] = useState([])
  const [editIndex, setEditIndex] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const FetchUpiList = async () => {
    try {
      const res = await fetchUpiList(authUser?.userId)
      if (res.success) {
        setUpiList(res.data)
      }
    } catch (error) {
      console.error("Error fetching UPI list:", error)
    } 
  }

  useEffect(()=>{
    if(authUser?.userId){
      FetchUpiList()
    }
  },[authUser])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...form,
      user_id: authUser?.userId,
    }
    let res;
    if (editIndex !== null) {
      res = await updateUpiId({ ...payload, upi_id: upiList[editIndex]._id })
    }else{ 
      res = await addUpiId(payload)
    }

    console.log("UPI added:", res)
    FetchUpiList()
    setEditIndex(null)
    setForm({ upi_name: "", upi_id: "" })
  }

  const handleEdit = (index) => {
    setForm(upiList[index])
    setEditIndex(index)
  }

  const handleDelete = async(upi_id) => {
    try {
      await deleteUpiId(upi_id)

      FetchUpiList()
    } catch (error) {
      console.error("Error deleting UPI ID:", error)
    }  
  }



  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          UPI Management
        </h1>

        {/* Add / Edit UPI Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          <input
            type="text"
            name="upi_name"
            placeholder="UPI Name"
            value={form.upi_name}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="upi_id"
            placeholder="UPI ID (example@upi)"
            value={form.upi_id}
            onChange={handleChange}
            required
            className="border rounded-lg px-4 py-2 focus:outline-none text-gray-700 focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white  rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </form>

        {/* UPI List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">UPI ID</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upiList.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">
                    No UPI added yet
                  </td>
                </tr>
              ) : (
                upiList.map((upi, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{upi.upi_name}</td>
                    <td className="p-3">{upi.upi_id}</td>
                    <td className="p-3">{upi.status===1 ? "Active" : "Inactive"}</td>
              

                    <td className="p-3 flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(index)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(upi._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default UpiPage

// services/upiApi.js
import { apiClient } from "./apiClient"

export const addUpiId = (payload) => {
  return apiClient("/api/upi", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}
export const fetchUpiList = (userId) => {
  return apiClient(`/api/upi?user_id=${userId}`, {
    method: "GET",
  })
}
export const changeActiveUpi = (upiId, userId) => {
  return apiClient(`/api/upi?upi_id=${upiId}`, {
    method: "PUT",
    body: JSON.stringify({ user_id: userId, source: "status" }),
  })
}
export const deleteUpiId = (upiId) => {
  return apiClient(`/api/upi?upi_id=${upiId}`, {
    method: "DELETE",
  })
}
export const updateUpiId = (payload,upiId) => {
  return apiClient(`/api/upi?upi_id=${upiId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  })
}
export const GenerateQR = (payload) => {
  return apiClient(`/api/qr`, {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

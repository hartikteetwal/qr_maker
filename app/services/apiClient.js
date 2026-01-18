// services/apiClient.js


export const apiClient = async (url, options = {}) => {
  const authUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("authUser"))
      : null

  const token = authUser?.token

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const response = await fetch(`${url}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json()
    throw error
  }

  return response.json()
}

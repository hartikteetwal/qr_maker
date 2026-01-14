import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token:
        typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});


export const { setToken, logout } = authSlice.action
export default authSlice.reducer
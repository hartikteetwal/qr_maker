import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authUser: null, // { token, role, userId }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;

            // save to localStorage
            localStorage.setItem(
                "authUser",
                JSON.stringify(action.payload)
            );

            // save to cookie
            document.cookie = `authUser=${JSON.stringify(
                action.payload
            )}; path=/`;
        },

        loadAuthUser: (state) => {
            // get cookie value
            const cookies = document.cookie.split("; ");
            const authCookie = cookies.find((c) => c.startsWith("authUser="));
            if (authCookie) {
                const cookieValue = authCookie.split("=")[1];
                try {
                    state.authUser = JSON.parse(cookieValue);
                } catch (err) {
                    console.error("Failed to parse authUser cookie:", err);
                    state.authUser = null;
                }
            }
        },

        logout: (state) => {
            state.authUser = null;
            localStorage.removeItem("authUser");
            document.cookie = "authUser=; path=/; max-age=0";
        },
    },
});

export const { setAuthUser, loadAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;

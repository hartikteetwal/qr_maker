"use client"

import { Provider } from "react-redux"
import { store } from "./redux/store"
import { useEffect } from "react"
import { loadAuthUser } from "./redux/authSlice"

export default function Providers({ children }) {
    useEffect(() => {
        store.dispatch(loadAuthUser())
    }, [])

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

import { createContext } from "react"

export const AuthContext = createContext({
    isAuthenticated: false,
    access: null,
    refresh: null,
    login: () => {
        return;
    },
    logout: () => {
        return;
    },
    user: {
        email: null
    }
})

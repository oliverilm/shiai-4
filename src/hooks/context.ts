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
        email: null,
        profile: {
            club: null,
            birthDate: null,
        }
    }
})

export const LoadingContext = createContext({
    isLoading: false,
    setLoading: (bool: boolean) => {
        return;
    },
})

export const NotificationContext = createContext({
    addAlert: (message: string, variant: "success" | "error" | "warning") => {
        return;
    }
})

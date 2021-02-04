import React, {useEffect,useState} from "react"

import api from "../auth"
import apiConstants from "../auth/apiConstants"
import { getCredentials } from "../utils"

const useAuthentication = (): {
    accessToken: string;
    refreshToken: string;
    isAuthenticated: boolean;
} => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [accessToken, setAccessToken] = useState<string>("")
    const [refreshToken, setRefreshToken] = useState<string>("")

    useEffect(() => {
        let mounted = true

        if (mounted) {
            const credentials = getCredentials()
            if (credentials.access_token === null) {
                setIsAuthenticated(false)
            }  
            // verify user with the api.
            // api.auth.verifyUser(credentials.access_token).then(result => {
            //     if (result.status === 200) {
            //         setIsAuthenticated(true)
            //         setAccessToken(result.data.access_token)
            //         setRefreshToken(result.data.refresh_token)
            //     }
            // })
        }

        return () => {
            mounted = false
        }
    }, [])

    return {accessToken, refreshToken, isAuthenticated}
}

export default useAuthentication
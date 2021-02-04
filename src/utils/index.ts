import apiConstants from "../auth/apiConstants";

export interface GoogleAuthBodyInterface {
    access_token: string;
    code?: string;
    id_token: string;
}


export interface ExtraQueryParams {
    authuser: string;
}

export interface SessionState {
    extraQueryParams: ExtraQueryParams;
}

export interface Uc {
    token_type: string;
    access_token: string;
    scope: string;
    login_hint: string;
    expires_in: number;
    id_token: string;
    session_state: SessionState;
    first_issued_at: number;
    expires_at: number;
    idpId: string;
}

export interface Es {
    wR: string;
    sd: string;
    bT: string;
    dR: string;
    fI: string;
    kt: string;
}

export interface ExtraQueryParams2 {
    authuser: string;
}

export interface SessionState2 {
    extraQueryParams: ExtraQueryParams2;
}

export interface TokenObj {
    token_type: string;
    access_token: string;
    scope: string;
    login_hint: string;
    expires_in: number;
    id_token: string;
    session_state: SessionState2;
    first_issued_at: number;
    expires_at: number;
    idpId: string;
}

export interface ProfileObj {
    googleId: string;
    imageUrl: string;
    email: string;
    name: string;
    givenName: string;
    familyName: string;
}

export interface RootObject {
    Ca: string;
    uc: Uc;
    Es: Es;
    googleId: string;
    tokenObj: TokenObj;
    tokenId: string;
    accessToken: string;
    profileObj: ProfileObj;
}

export const filterCorrectData = (data: RootObject): GoogleAuthBodyInterface => {
    const { access_token, id_token } = data.uc;
    return { access_token, id_token }

}


export interface User {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface Data {
    access_token: string;
    refresh_token: string;
    user: User;
}

export interface Headers {
    "access-control-allow-credentials": string;
    "access-control-allow-headers": string;
    "access-control-allow-methods": string;
    "access-control-allow-origin": string;
    "access-control-expose-headers": string;
    allow: string;
    connection: string;
    "content-length": string;
    "content-type": string;
    date: string;
    "referrer-policy": string;
    server: string;
    vary: string;
    "x-content-type-options": string;
}

export interface Headers2 {
    Accept: string;
    "Content-Type": string;
}

export interface Config {
    url: string;
    method: string;
    data: string;
    headers: Headers2;
    baseURL: string;
    transformRequest: any[];
    transformResponse: any[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
}


export interface AuthResponseRootObject {
    data: Data;
    status: number;
    statusText: string;
    headers: Headers;
    config: Config;
    request: Request;
}

export const handleLocalStoragePopulation = (data: AuthResponseRootObject): boolean => {
    if (data.status === 200) {
        localStorage.setItem(apiConstants.TOKEN, JSON.stringify(data.data))
        return true;
    }
    return false;
}

export const getCredentials = (): {
    access_token: string | null;
    refresh_token: string | null;
} => {
    const data = localStorage.getItem(apiConstants.TOKEN)
    if (data) {
        const { access_token, refresh_token } = JSON.parse(data)
        return { access_token, refresh_token }
    }
    return {
        access_token: null, refresh_token: null
    }

}


export const removeCredentials = () => {
    localStorage.removeItem(apiConstants.TOKEN)
}


export interface Data {
    id: number;
    last_login: Date;
    is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: Date;
    groups: any[];
    user_permissions: any[];
}
export interface Headers2 {
    Accept: string;
    Authorization: string;
}

export interface Config {
    url: string;
    method: string;
    headers: Headers2;
    baseURL: string;
    transformRequest: any[];
    transformResponse: any[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
}
export interface UserVerifyResult {
    data: Data;
    status: number;
    statusText: string;
    headers: Headers;
    config: Config;
    request: Request;
}

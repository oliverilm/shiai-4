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
    const {access_token, id_token} = data.uc;
    return {access_token, id_token}

}
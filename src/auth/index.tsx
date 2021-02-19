import axios, { AxiosRequestConfig } from "axios"

import { filterCorrectData, handleLocalStoragePopulation, UserVerifyResult } from "../utils";
import { Competition } from "../utils/interfaces";
import apiConstants from "./apiConstants"

axios.defaults.baseURL = apiConstants.BASE_URL;
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.interceptors.request.use(req => {
    // if request needs authentication and it is not provided. log user out.

    return req
})

const setHeaders = () => {
    const tokens = localStorage.getItem(apiConstants.TOKEN)
    if (tokens) {
        const content = JSON.parse(tokens);
        axios.defaults.headers.common["Authorization"] = `Bearer ${content.access_token}`
    } else {
        axios.defaults.headers.common["Authorization"] = null;
    }
}

const getRequest = async (url: string, id?: string): Promise<any> => {
    setHeaders()
    return axios.get(url);
}

const postRequest = async (url: string, body: object): Promise<any> => {
    return axios.post(url, body)
}

const patchRequest = async (url: string, body: object): Promise<any> => {
    return axios.patch(url, body)
}

const putRequest = async (url: string, body: object): Promise<any> => {
    return axios.put(url, body)
}

const deleteRequest = async (url: string): Promise<any> => {
    return axios.delete(url)
}

const bulkRequest = (requests: Array<AxiosRequestConfig>): Promise<AxiosRequestConfig[]> => {
    return axios.all(requests)
}

interface MainResponse {
    status: any;
}
interface ClubCreateInterface {
    name: string;
}

interface ClubCreateResponse extends MainResponse {
    name: string;
    owner: string;
    slug: string;
    uuid: string;
    created: string;
}

interface DateRange {
    bounds: string;
    lower: Date;
    upper: Date;
}

interface CompetitionCreateData {
    name: string;
    image: null;
    description: string;
    dateRange: string;
    location: string;
    registrationEndDate: Date;
    registrationFee: number;
    currency: string;
    isPublished: boolean;
}

export interface Data {
    uuid: string;
    name: string;
    image?: any;
    slug: string;
    description: string;
    dateRange: string;
    location: string;
    registrationEndDate: Date;
    registrationFee: number;
    currency: string;
    priorityLevel?: any;
    created: Date;
    isPublished: boolean;
    owner?: any;
}


export interface Headers2 {
    Accept: string;
    Authorization: string;
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

export interface RootObject {
    data: any;
    status: number;
    statusText: string;
    config: Config;
    request: Request;
}


interface ClubListResponse extends MainResponse {
    data: [];
}

const api = {
    competitions: {
        list: (): Promise<ClubListResponse> =>
            getRequest(apiConstants.COMPETITION_LIST),

        detail: (slug: number): Promise<ClubCreateResponse> =>
            getRequest(`${apiConstants.COMPETITION_DETAIL}/${slug}`),

        create: (data: CompetitionCreateData): Promise<RootObject> =>
            postRequest(apiConstants.COMPETITION_CREATE, data ),

        update: (data: ClubCreateInterface): Promise<ClubCreateResponse> =>
            patchRequest(apiConstants.COMPETITION_UPDATE, { data }),

        delete: (slug: string): Promise<any> =>
            deleteRequest(`${apiConstants.COMPETITION_DETAIL}/${slug}`),
    },
    // club: {
    //     list: () => {},
    //     detail: () => {},
    //     create: () => {},
    //     update: () => {},
    //     delete: () => {},
    // },
    // judoka: {
    //     list: () => {},
    //     detail: () => {},
    //     create: () => {},
    //     update: () => {},
    //     delete: () => {},
    // },
    auth: {
        //   authenticate: () => {},
        googleAuth: async (data: any): Promise<any> => {
            const result = await postRequest("auth/google/", filterCorrectData(data))

            handleLocalStoragePopulation(result)
            return result
        },
        verifyUser: (): Promise<UserVerifyResult> => getRequest(apiConstants.VERIFYUSER)
        //   facebookAuth: () => {}
    }
}

export default api;
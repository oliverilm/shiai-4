import axios, { AxiosRequestConfig } from "axios"

import apiConstants from "./apiConstants"

axios.defaults.baseURL = apiConstants.BASE_URL;
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

const getRequest = async (url: string, id?: string): Promise<any>  => {
    return axios.get(url)
}

const postRequest = async (url: string, body: object): Promise<any>  => {
    return axios.post(url, body)
}

const patchRequest = async (url: string, body: object): Promise<any>  => {
    return axios.patch(url, body)
}

const putRequest = async (url: string, body: object): Promise<any>  => {
    return axios.put(url, body)
}

const deleteRequest = async (url: string): Promise<any>  => {
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

interface ClubListResponse extends MainResponse {
    clubs: ClubCreateResponse[];
}

const api = {
    competitions: {
        list: (): Promise<ClubListResponse> => 
          getRequest(apiConstants.COMPETITION_LIST),

        detail: (slug: number): Promise<ClubCreateResponse> =>  
          getRequest(`${apiConstants.COMPETITION_DETAIL}/${slug}`),

        create : (data: ClubCreateInterface): Promise<ClubCreateResponse> => 
          postRequest(apiConstants.COMPETITION_CREATE, { data }),

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
      googleAuth: (data: any) => {
          postRequest("auth/google/", data)
      },
    //   facebookAuth: () => {}
    }
}

export default api;
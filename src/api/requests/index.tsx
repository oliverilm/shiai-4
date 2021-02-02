import axios, { AxiosPromise, AxiosRequestConfig } from "axios"

import apiConstants from "../auth/apiConstants"

axios.defaults.baseURL = apiConstants.BASE_URL;
axios.defaults.headers.get['Accept'] = 'application/json';   
axios.defaults.headers.post['Accept'] = 'application/json';

const getRequest = async (url: string): Promise<object>  => {
    return axios.get(url)
}

const postRequest = async (url: string, body: object): Promise<object>  => {
    return axios.post(url, body)
}

const patchRequest = async (url: string, body: object): Promise<object>  => {
    return axios.patch(url, body)
}

const putRequest = async (url: string, body: object): Promise<object>  => {
    return axios.put(url, body)
}

const deleteRequest = async (url: string, body: object): Promise<object>  => {
    return axios.delete(url, body)
}

const bulkRequest = (requests: Array<AxiosRequestConfig>): Promise<AxiosRequestConfig[]> => {
    return axios.all(requests)
}

export default {
    
}
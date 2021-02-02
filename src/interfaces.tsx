import { type } from "os";

export interface BaseRequest {
    url: string;
}
export interface PostRequest { 
    body: object;
}

export type GetRequest = BaseRequest;
export type PutRequest = PostRequest;
export type PatchRequest = PostRequest;
export type DeleteRequest = BaseRequest;
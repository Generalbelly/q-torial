import axios, { AxiosResponse, Method, ResponseType } from 'axios';

interface requestOptions {
  method: Method,
  url: string,
  baseURL?: string,
  headers?: Object,
  responseType?: ResponseType,
  data?: any,
}

export const GET_METHOD = 'GET';
export const POST_METHOD = 'POST';
export const PUT_METHOD = 'PUT';

export const makeRequest = async (options: requestOptions): Promise<AxiosResponse> => {
  return axios.request({
    method: options.method,
    baseURL: options.baseURL,
    url: options.url,
    headers: options.headers,
    data: options.data,
  });
};

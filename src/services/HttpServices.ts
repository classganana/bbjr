import axios, { AxiosResponse, AxiosError } from 'axios';
import { ToastService } from './ToastService';

const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT;
const BASE_URL_STAGE = process.env.REACT_APP_STAGING_API_ENDPOINT;
const BASE_URL_PROD = process.env.REACT_APP_PRODUCTION_API_ENDPOINT;
const BASE_URL_LOCAL = process.env.REACT_APP_LOCAL_API_ENDPOINT;
const AUTH_API = 'http://3.108.255.68:3000';
export const CDN = 'https://d1n3r5qejwo9yi.cloudfront.net/subject/';

let BASE_URL = BASE_URL_STAGE;

if (ENVIRONMENT === 'PRODUCTION') {
  BASE_URL = BASE_URL_PROD;
} else if (ENVIRONMENT === 'LOCAL') {
  BASE_URL = BASE_URL_LOCAL;
} else {
  BASE_URL = BASE_URL_STAGE;
}

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const getHeaders = async (_headers: any) => {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json; charset=utf-8',
    ..._headers,
  };
};

export const httpClient = {
  get: async (path: string, params = {}, _headers = {}) => {
    try {
      const headers = await getHeaders(_headers);
      const options = { params, headers };
      const res: AxiosResponse = await axios.get(`${AUTH_API}/${path}`, options);
      return res;
    } catch (error: any) {
      handleApiError(error.status);
      throw error;
    }
  },
  post: async (path: string, data: any, params = {}, _headers = {}) => {
    try {
      const headers = await getHeaders(_headers);
      const options = { params, headers };
      const res: AxiosResponse = await axios.post(`${AUTH_API}/${path}`, data, options);
      return res;
    } catch (error: any) {
        return {
          data : {
            statusCode: 500
          }
        };
        // handleApiError();
    }
  },
  patch: async (path: string, data: any, params = {}, _headers = {}) => {
    try {
      const headers = await getHeaders(_headers);
      const options = { params, headers };
      const res: AxiosResponse = await axios.patch(`${AUTH_API}/${path}`, data, options);
      return res;
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  },
  put: async (path: string, data: any, params = {}, _headers = {}) => {
    try {
      const headers = await getHeaders(_headers);
      const options = { params, headers };
      const res: AxiosResponse = await axios.put(`${AUTH_API}/${path}`, data, options);
      return res;
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  },
  delete: async (path: string, data: any, params = {}, _headers = {}, isAuth = true) => {
    try {
      const headers = await getHeaders(_headers);
      const options = { data, params, headers };
      const res: AxiosResponse = await axios.delete(`${AUTH_API}/${path}`, options);
      return res;
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  },
};

const handleApiError = () => {
  ToastService('Something went wrong');
  // You can implement error handling logic here, such as showing a modal or toast notification to the user
  // Additionally, you can perform actions like logging the error or sending analytics data
};

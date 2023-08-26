// import axios from "axios";

// const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT;
// const BASE_URL_STAGE = process.env.REACT_APP_STAGING_API_ENDPOINT;
// const BASE_URL_PROD = process.env.REACT_APP_PRODUCTION_API_ENDPOINT;
// const BASE_URL_LOCAL = process.env.REACT_APP_LOCAL_API_ENDPOINT;

// let BASE_URL = BASE_URL_STAGE;

// if (ENVIRONMENT === "PRODUCTION") {
//   BASE_URL = BASE_URL_PROD;
// } else if (ENVIRONMENT === "LOCAL") {
//   BASE_URL = BASE_URL_LOCAL;
// } else {
//   BASE_URL = BASE_URL_STAGE;
// }

// axios.defaults.baseURL = BASE_URL;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";

// export const getHeaders = async (_headers: any) => {
//   return {
//     "Content-Type": "application/json; charset=utf-8",
//     Accept: "application/json; charset=utf-8",
//     ..._headers,
//   };
// };

// export const httpClient = {
//   get: async (path: string, params = {}, _headers = {}) => {
//     let headers;
//     headers = await getHeaders(_headers);
//     let options = { params, headers };
//     const res = await axios.get(path, options);
//     return res;
//   },
//   post: async (path: string, data: any, params = {}, _headers = {}) => {
//     let headers;
//     headers = await getHeaders(_headers);
//     const options = { params, headers };
//     const res = await axios.post(path, data, options);
//     return res;
//   },
//   patch: async (path: string, data: any, params = {}, _headers = {}) => {
//     let headers;
//     headers = await getHeaders(_headers);
//     const options = { params, headers };
//     const res = await axios.patch(path, data, options);
//     return res;
//   },
//   put: async (path: string, data: any, params = {}, _headers = {}) => {
//     let headers;
//     headers = await getHeaders(_headers);
//     const options = { params, headers };
//     const res = await axios.put(path, data, options);
//     return res;
//   },
//   delete: async (
//     path: string,
//     data: any,
//     params = {},
//     _headers = {},
//     isAuth = true
//   ) => {
//     let headers;
//     headers = await getHeaders(_headers);
//     const options = { data, params, headers };
//     const res = await axios.delete(path, options);
//     return res;
//   },
// };

import axios, { AxiosError } from "axios";

import config from "../config";

const ECONNABORTED = "ECONNABORTED";

const Api = axios.create({
  baseURL: config.api.url,
});

const onResponseSuccess = (response: any) => response;

const onResponseFail = async (error: AxiosError) => {
  if (error.code === ECONNABORTED) {
    let customError = new Error("Sorry time exceeded, try again.");
    return Promise.reject(customError);
  }

  return Promise.reject(error);
};

Api.interceptors.response.use(onResponseSuccess, onResponseFail);

export default Api;

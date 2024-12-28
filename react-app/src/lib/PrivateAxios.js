import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  async (config) => {
    const access_token = localStorage.getItem("access-token");

    if (access_token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${access_token}`,
      };
    }

    return config;
  },

  (error) => Promise.reject(error)
);

/**
 * Like `axiosInstance` but this sends `access_token` with any request,
 * Use it in any request that requires auth(access token)
 */
export const axiosPrivate = axios;

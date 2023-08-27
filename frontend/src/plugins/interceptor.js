import axios from "axios";

let baseURL = process.env.VUE_APP_API_URL;

const httpClient = axios.create({ baseURL });
// Add a request interceptor
httpClient.interceptors.request.use(
  async (config) => {
    const newConfig = config;
    const token = window.localStorage.getItem("token");
    newConfig.headers.Authorization = `Bearer ${token}`;
    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  (response) => {
    if (response.data instanceof Blob) {
      return response.data;
    }
    return response.data || {};
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        window.localStorage.removeItem("access_token");
      } else {
      }
    } else {
    }
  }
);

export default httpClient;

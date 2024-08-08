import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL_BACKEND;

export const visitanteApi = axios.create({
  baseURL: `${baseURL}`,
  timeout: 5000,
  withCredentials: true
});

visitanteApi.interceptors.request.use(
  (config) => {
    const accessToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// export const getCategory = (id) => {
//   const res = visitanteApi.get(`/api/v1/categories/${id}/`);
//   return res.data;
// };

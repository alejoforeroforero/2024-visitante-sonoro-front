import axios from "axios";


export const visitanteApi = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// visitanteApi.interceptors.request.use(
  
//   (config) => {
   
//     const token = store.getState().auth.token;
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export const getCategory = (id) => {
  const res = visitanteApi.get(`/api/v1/categories/${id}/`);
  return res.data;
};



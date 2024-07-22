import axios from "axios";

export const visitanteApi = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getCategory = (id) => {
  const res = visitanteApi.get(`/api/v1/categories/${id}/`);
  return res.data;
};



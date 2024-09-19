import { visitanteApi } from "@/api/visitante.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAuthors= createAsyncThunk(
  "visitante/fetchAuthors",
  async (options) => {
    const res = await visitanteApi.get(`/v1/authors/`, {
      params: options,
    });
    return res.data.results;
  }
);

export const fetchAuthorDetails= createAsyncThunk(
  "visitante/fetchAuthorDetails",
  async (options) => {
    const res = await visitanteApi.get(`/v1/authors/${options}/`, {
      
    });
    return res.data;
  }
);
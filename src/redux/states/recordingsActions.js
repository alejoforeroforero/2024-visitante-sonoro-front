import { visitanteApi } from "@/api/visitante.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecordings = createAsyncThunk(
  "visitante/fetchRecordings",
  async (options) => {
    const res = await visitanteApi.get(`/api/v1/recordings/`, {
      params: options,
    });
    return res.data.results;
  }
);

export const fetchRecordingsByCategory = createAsyncThunk(
  "visitante/fetchRecordingsByCategory",
  async (options) => {
    const res = await visitanteApi.get(
      `/api/v1/category/?category=${options.category}`,
      {
        params: options,
      }
    );
    return res.data.results;
  }
);

export const fetchRecordDetails = createAsyncThunk(
  "visitante/fetchRecordDetails",
  async (options) => {
    try {
      const res = await visitanteApi.get(`/api/v1/recordings/${options}/`, {});
      return res.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "visitante/fetchCategory",
  async (id, options) => {
    const res = await visitanteApi.get(`/api/v1/categories/${id}/`, {
      params: options,
    });
    return res.data;
  }
);

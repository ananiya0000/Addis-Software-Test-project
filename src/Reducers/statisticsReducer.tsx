import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootStateStatistics } from "../types";

const initialState: RootStateStatistics = {
  totalStatistics: null,
  songsInEveryGenre: [],
  artistsSongsAndAlbums: [],
  songsInEachAlbum: [],
  loading: false,
  error: "",
};

const BASE_URL =
  "https://addissoftawretestprojectbackend.onrender.com/api/statistics";
export const fetchTotalStatistics = createAsyncThunk(
  "statistics/fetchTotalStatistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/totalstatistics`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchSongsInEveryGenre = createAsyncThunk(
  "statistics/fetchSongsInEveryGenre",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/songsineverygenre`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchArtistsSongsAndAlbums = createAsyncThunk(
  "statistics/fetchArtistsSongsAndAlbums",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/artistsongsandalbum`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchSongsInEachAlbum = createAsyncThunk(
  "statistics/fetchSongsInEachAlbum",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/songsineachalbum`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTotalStatistics.fulfilled, (state, action) => {
        state.totalStatistics = action.payload;
      })
      .addCase(fetchSongsInEveryGenre.fulfilled, (state, action) => {
        state.songsInEveryGenre = action.payload;
      })
      .addCase(fetchArtistsSongsAndAlbums.fulfilled, (state, action) => {
        state.artistsSongsAndAlbums = action.payload;
      })
      .addCase(fetchSongsInEachAlbum.fulfilled, (state, action) => {
        state.songsInEachAlbum = action.payload;
      });
  },
});

export default statisticsSlice.reducer;

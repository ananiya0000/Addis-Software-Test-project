import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Songs, RootStateSongs } from "../types";
import axios from "axios";
const initialState: RootStateSongs = {
  loading: false,
  songs: [],
  error: "",
};
const BASE_URL =
  "https://addissoftawretestprojectbackend.onrender.com/api/songs";
export const fetchSongs = createAsyncThunk(
  "songs/fetchSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getallsongs`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createSong = createAsyncThunk(
  "songs/createSong",
  async (song: Songs, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/createsong`, song);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const editSong = createAsyncThunk(
  "songs/editSong",
  async (song: Songs, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/updatesong`, song);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delSong = createAsyncThunk(
  "songs/delSong",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/removesong`, {
        data: { _id: id },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    addSong: (state, action) => {
      state.songs = [...state.songs, action.payload];
    },
    updateSong: (state, action) => {
      const { id, title, artist, album, genre } = action.payload;
      const existsong = state.songs.find((song) => song._id == id);
      if (existsong) {
        existsong.title = title;
        existsong.artist = artist;
        existsong.album = album;
        existsong.genre = genre;
      }
    },
    deleteSong: (state, action) => {
      const { id } = action.payload;
      const existsong = state.songs.find((song) => song._id == id);
      if (existsong) {
        return {
          ...state,
          songs: state.songs.filter((song) => song._id != id),
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state: RootStateSongs) => {
        state.loading = true;
      })
      .addCase(fetchSongs.fulfilled, (state: RootStateSongs, action) => {
        state.loading = false;
        state.songs = action.payload;
        state.error = "";
      })
      .addCase(fetchSongs.rejected, (state: RootStateSongs, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createSong.fulfilled, (state: RootStateSongs, action) => {
        state.songs.push(action.payload);
        state.error = "";
      })
      .addCase(createSong.rejected, (state: RootStateSongs, action) => {
        state.error = action.payload as string;
      })
      .addCase(editSong.fulfilled, (state: RootStateSongs, action) => {
        const index = state.songs.findIndex(
          (song) => song._id == action.payload._id
        );
        if (index !== -1) {
          state.songs[index] = action.payload;
        }
        state.error = "";
      })
      .addCase(editSong.rejected, (state: RootStateSongs, action) => {
        state.error = action.payload as string;
      })
      .addCase(delSong.fulfilled, (state: RootStateSongs, action) => {
        state.songs = state.songs.filter(
          (song) => song._id !== action.payload._id
        );
        state.error = "";
      })
      .addCase(delSong.rejected, (state: RootStateSongs, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { addSong, updateSong, deleteSong } = songsSlice.actions;
export default songsSlice.reducer;

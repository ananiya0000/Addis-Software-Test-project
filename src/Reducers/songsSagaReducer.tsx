import { createSlice } from "@reduxjs/toolkit";
import { Songs, RootStateSongs } from "../types";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  AddSongAction,
  DeleteSongAction,
  SongAction,
  UpdateSongAction,
} from "./songAction";
import axios from "axios";
const initialState: RootStateSongs = {
  loading: false,
  songs: [],
  error: "",
};
const BASE_URL =
  "https://addissoftawretestprojectbackend.onrender.com/api/songs";
function* fetchSongsSaga(): Generator<any, any, any> {
  try {
    const response = yield call(axios.get, `${BASE_URL}/getallsongs`);
    yield put(fetchSongsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.response.data));
  }
}
function* addSongSaga(action: AddSongAction): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.post,
      `${BASE_URL}/addsong`,
      action.payload
    );
    yield put(addSongSuccess(response.data));
  } catch (error: any) {
    yield put(addSongFailure(error.response.data));
  }
}

function* updateSongSaga(action: UpdateSongAction): Generator<any, void, any> {
  try {
    const response = yield call(
      axios.put,
      `${BASE_URL}/updatesong/${action.payload.id}`,
      action.payload.updatedData
    );
    yield put(updateSongSuccess(response.data));
  } catch (error: any) {
    yield put(updateSongFailure(error.response.data));
  }
}

function* deleteSongSaga(action: DeleteSongAction): Generator<any, void, any> {
  try {
    const response = yield call(axios.delete, `${BASE_URL}/removesong`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: { _id: action.payload.id },
    });
    yield put(deleteSongSuccess(response.data));
  } catch (error: any) {
    yield put(deleteSongFailure(error.response.data));
  }
}

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs: () => {},
    addSong: (state, action) => {},
    updateSong: (state, action) => {},
    deleteSong: (state, action) => {},
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = action.payload;
      state.error = "";
    },
    addSongSuccess: (state, action) => {
      state.songs.push(action.payload);
      state.error = "";
    },
    updateSongSuccess: (state, action) => {
      const index = state.songs.findIndex(
        (song) => song._id == action.payload._id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
      state.error = "";
    },
    deleteSongSuccess: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.songs = state.songs.filter(
        (song) => song._id !== action.payload._id
      );
      state.error = "";
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    },
    addSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    },
    updateSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    },
    deleteSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    },
  },
});

export const {
  fetchSongs,
  addSong,
  updateSong,
  deleteSong,
  fetchSongsSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  addSongSuccess,
  fetchSongsFailure,
  addSongFailure,
  updateSongFailure,
  deleteSongFailure,
} = songsSlice.actions;

export function* songsSaga() {
  yield takeLatest("songs/fetchSongs", fetchSongsSaga);
  yield takeLatest(addSong.type, addSongSaga);
  yield takeLatest(updateSong.type, updateSongSaga);
  yield takeLatest(deleteSong.type, deleteSongSaga);
}
export default songsSlice.reducer;

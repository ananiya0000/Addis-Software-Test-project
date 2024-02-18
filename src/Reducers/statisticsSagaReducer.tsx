import { createSlice } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import { RootStateStatistics, TotalStatistics } from "../types";

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

function* fetchTotalStatisticsSaga(): Generator<any, any, any> {
  try {
    const response = yield call(axios.get, `${BASE_URL}/totalstatistics`);
    yield put(fetchTotalStatisticsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchTotalStatisticsFailure(error.response.data));
  }
}

function* fetchSongsInEveryGenreSaga(): Generator<any, any, any> {
  try {
    const response = yield call(axios.get, `${BASE_URL}/songsineverygenre`);
    yield put(fetchSongsInEveryGenreSuccess(response.data));
  } catch (error: any) {
    yield put(fetchSongsInEveryGenreFailure(error.response.data));
  }
}

function* fetchArtistsSongsAndAlbumsSaga(): Generator<any, any, any> {
  try {
    const response = yield call(axios.get, `${BASE_URL}/artistsongsandalbum`);
    yield put(fetchArtistsSongsAndAlbumsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchArtistsSongsAndAlbumsFailure(error.response.data));
  }
}

function* fetchSongsInEachAlbumSaga(): Generator<any, any, any> {
  try {
    const response = yield call(axios.get, `${BASE_URL}/songsineachalbum`);
    yield put(fetchSongsInEachAlbumSuccess(response.data));
  } catch (error: any) {
    yield put(fetchSongsInEachAlbumFailure(error.response.data));
  }
}

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    fetchTotalStatistics: () => {},
    fetchSongsInEveryGenre: () => {},
    fetchArtistsSongsAndAlbums: () => {},
    fetchSongsInEachAlbum: () => {},
    fetchTotalStatisticsSuccess: (state, action) => {
      state.totalStatistics = action.payload;
    },
    fetchTotalStatisticsFailure: (state, action) => {
      state.error = action.payload;
    },
    fetchSongsInEveryGenreSuccess: (state, action) => {
      state.songsInEveryGenre = action.payload;
    },
    fetchSongsInEveryGenreFailure: (state, action) => {
      state.error = action.payload;
    },
    fetchArtistsSongsAndAlbumsSuccess: (state, action) => {
      state.artistsSongsAndAlbums = action.payload;
    },
    fetchArtistsSongsAndAlbumsFailure: (state, action) => {
      state.error = action.payload;
    },
    fetchSongsInEachAlbumSuccess: (state, action) => {
      state.songsInEachAlbum = action.payload;
    },
    fetchSongsInEachAlbumFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchTotalStatistics,
  fetchSongsInEveryGenre,
  fetchArtistsSongsAndAlbums,
  fetchSongsInEachAlbum,
  fetchTotalStatisticsSuccess,
  fetchTotalStatisticsFailure,
  fetchSongsInEveryGenreSuccess,
  fetchSongsInEveryGenreFailure,
  fetchArtistsSongsAndAlbumsSuccess,
  fetchArtistsSongsAndAlbumsFailure,
  fetchSongsInEachAlbumSuccess,
  fetchSongsInEachAlbumFailure,
} = statisticsSlice.actions;

export function* statisticsSaga() {
  yield takeLatest("statistics/fetchTotalStatistics", fetchTotalStatisticsSaga);
  yield takeLatest(
    "statistics/fetchSongsInEveryGenre",
    fetchSongsInEveryGenreSaga
  );
  yield takeLatest(
    "statistics/fetchArtistsSongsAndAlbums",
    fetchArtistsSongsAndAlbumsSaga
  );
  yield takeLatest(
    "statistics/fetchSongsInEachAlbum",
    fetchSongsInEachAlbumSaga
  );
}

export default statisticsSlice.reducer;

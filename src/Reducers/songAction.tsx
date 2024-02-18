import { Songs } from "../types";

export interface FetchSongsAction {
  type: "songs/fetchSongs";
}

export interface AddSongAction {
  type: "songs/addSong";
  payload: Songs;
}

export interface UpdateSongAction {
  type: "songs/updateSong";
  payload: {
    id: string;
    updatedData: Songs;
  };
}

export interface DeleteSongAction {
  type: "songs/deleteSong";
  payload: {
    id: string;
  };
}

export type SongAction =
  | FetchSongsAction
  | AddSongAction
  | UpdateSongAction
  | DeleteSongAction;

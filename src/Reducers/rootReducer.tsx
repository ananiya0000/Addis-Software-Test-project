import { combineReducers } from "@reduxjs/toolkit";
import songsReducer from "./songsReducer";
import statisticsReducer from "./statisticsReducer";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  songs: songsReducer,
  statistics: statisticsReducer,
});

export default rootReducer;

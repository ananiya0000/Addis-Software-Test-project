import { combineReducers } from "@reduxjs/toolkit";
import statisticsSagaReducer from "./statisticsSagaReducer";
import songsSagaReducer from "./songsSagaReducer";

export type RootState = ReturnType<typeof rootSagaReducer>;

const rootSagaReducer = combineReducers({
  songs: songsSagaReducer,
  statistics: statisticsSagaReducer,
});

export default rootSagaReducer;

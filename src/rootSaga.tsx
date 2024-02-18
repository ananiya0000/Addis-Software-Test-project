import { all } from "redux-saga/effects";

import { statisticsSaga } from "./Reducers/statisticsSagaReducer";
import { songsSaga } from "./Reducers/songsSagaReducer";

export function* rootSaga() {
  yield all([statisticsSaga(), songsSaga()]);
}

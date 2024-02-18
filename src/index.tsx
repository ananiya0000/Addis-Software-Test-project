import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { Middleware, applyMiddleware, configureStore } from "@reduxjs/toolkit";
import songsReducer from "./Reducers/songsReducer";
import statisticsReducer from "./Reducers/statisticsReducer";
import rootReducer from "./Reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import { statisticsSaga } from "./Reducers/statisticsSagaReducer";
import rootSagaReducer from "./Reducers/rootSagaReducer";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootSagaReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

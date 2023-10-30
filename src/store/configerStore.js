import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["listData"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = configureStore({ reducer: persistedReducer });
let persistor = persistStore(store);

export { store, persistor };

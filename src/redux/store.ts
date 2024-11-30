import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./authSlice";
import songsReducer from "./songsSlice";
import recentlyPlayedReducer from "./recentlyPlayedSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  songs: songsReducer,
  recentlyPlayed: recentlyPlayedReducer,
});

//saving redux state data in async storage
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "recentlyPlayed"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import catalogReducer from "./catalogSlice";
import favoritesReducer from "./favoritesSlice";
import historyReducer from "./historySlice";

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    favorites: favoritesReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useThunkDispatch = () =>
  useDispatch<typeof store.dispatch>();

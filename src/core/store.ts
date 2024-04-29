import { configureStore } from "@reduxjs/toolkit";
import catalogReducer from "./catalogSlice";
import favoritesReducer from "./favoritesSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useThunkDispatch = () =>
  useDispatch<typeof store.dispatch>();

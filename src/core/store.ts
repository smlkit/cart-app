import { configureStore } from "@reduxjs/toolkit";
import catalogReducer from "./catalogSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();

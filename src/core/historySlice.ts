import {
  createSlice,
  createSelector,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ItemType } from "../utils/types";

const localStorageHistory: HistoryOrderType[] =
  JSON.parse(localStorage.getItem("history") || "{}") || {};

type CartItem = {
  item: ItemType;
  itemAmount: number;
};

export type HistoryOrderType = {
  status: string;
  date: string;
  address: string;
  items: CartItem[];
  total: number;
};

type HistoryState = {
  history: HistoryOrderType[];
};

const initialState: HistoryState = {
  history: Array.isArray(localStorageHistory)
    ? localStorageHistory
    : [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    submitOrder: (
      state,
      action: PayloadAction<HistoryOrderType>
    ) => {
      const payload = action.payload;
      console.log(payload);
      state.history.push(payload);
      localStorage.setItem(
        "history",
        JSON.stringify(state.history)
      );
    },
  },
});

const selfSelector = (state: RootState) => state.history;

export const { submitOrder } = historySlice.actions;

export const historySelector = createSelector(
  selfSelector,
  (state) => state.history
);

export default historySlice.reducer;

import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import type { RootState } from "./store";
import { ItemType, StatusOfRequestEnum } from "../utils/types";

const cartItems = JSON.parse(localStorage.getItem("cart") || "[]") || [];
const amount = cartItems.length;
const total = cartItems.reduce(
  (acc: number, item: ItemType) => acc + item.price,
  0
);

const CATALOG_URL = "https://appevent.ru/dev/task1/catalog";

type CatalogState = {
  fetchCatalog: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: ItemType[];
  };
  cart: {
    cartItems: ItemType[];
    amount: number;
    total: number;
  };
};

const initialState: CatalogState = {
  fetchCatalog: {
    status: StatusOfRequestEnum.IDLE,
    error: null,
    data: [],
  },
  cart: {
    cartItems,
    amount,
    total,
  },
};

export const fetchCatalog = createAsyncThunk<
  ItemType[],
  undefined,
  { rejectValue: string }
>("catalog/fetchCatalog", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(CATALOG_URL);
    return response.data.items;
  } catch (error) {
    if (isAxiosError(error)) return rejectWithValue(error.message);
    return rejectWithValue("unknown error");
  }
});

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemType>) => {
      const itemId = action.payload.id;
      const item = state.cart.cartItems.find((item) => item.id === itemId);
      if (!item) {
        state.cart.cartItems.push(action.payload);
        let cart = JSON.parse(localStorage.getItem("cart") || "[]") || [];
        cart.push(action.payload);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.cart.cartItems = state.cart.cartItems.filter(
        (item) => item.id !== itemId
      );
      localStorage.setItem("cart", JSON.stringify(state.cart.cartItems));
    },
    calculateTotals: (state) => {
      let total = 0;

      state.cart.cartItems.forEach((item) => {
        total += item.price;
      });

      state.cart.amount = state.cart.cartItems.length;
      state.cart.total = total;
      console.log(state.cart.amount, state.cart.total);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.fetchCatalog.status = StatusOfRequestEnum.LOADING;
        state.fetchCatalog.error = null;
        state.fetchCatalog.data = [];
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.fetchCatalog.status = StatusOfRequestEnum.SUCCESS;
        state.fetchCatalog.error = null;
        state.fetchCatalog.data = action.payload;
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.fetchCatalog.error = action.payload || "unknown error";
        state.fetchCatalog.status = StatusOfRequestEnum.ERROR;
        state.fetchCatalog.data = [];
      });
  },
});

const selfSelector = (state: RootState) => state.catalog;

export const { addItem, removeItem, calculateTotals } = catalogSlice.actions;

export const fetchCatalogSelector = createSelector(
  selfSelector,
  (state) => state.fetchCatalog
);
export const cartSelector = createSelector(selfSelector, (state) => state.cart);

export default catalogSlice.reducer;

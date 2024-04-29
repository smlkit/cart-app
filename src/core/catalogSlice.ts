import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import type { RootState } from "./store";
import {
  ItemType,
  StatusOfRequestEnum,
} from "../utils/types";

const cartItems =
  JSON.parse(localStorage.getItem("cart") || "{}") || {};
const amount = 0;

const total = 0;

const CATALOG_URL = "https://appevent.ru/dev/task1/catalog";

type CartItem = {
  item: ItemType;
  itemAmount: number;
};

type CatalogState = {
  fetchCatalog: {
    status: StatusOfRequestEnum;
    error: string | null;
    data: ItemType[];
  };
  cart: {
    cartItems: { [key: string]: CartItem };
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
>(
  "catalog/fetchCatalog",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(CATALOG_URL);
      return response.data.items;
    } catch (error) {
      if (isAxiosError(error))
        return rejectWithValue(error.message);
      return rejectWithValue("unknown error");
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemType>) => {
      const itemId = action.payload.id;
      const item = state.cart.cartItems[itemId];
      if (!item) {
        state.cart.cartItems[itemId] = {
          item: action.payload,
          itemAmount: 1,
        };
      } else {
        item.itemAmount++;
      }
      state.cart.amount++;
      state.cart.total += action.payload.price;
      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart.cartItems)
      );
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const item = state.cart.cartItems[itemId];
      if (item.itemAmount > 1) {
        item.itemAmount--;
        state.cart.amount--;
        state.cart.total -= item.item.price;
      } else {
        delete state.cart.cartItems[itemId];
        state.cart.amount -= item.itemAmount;
        state.cart.total -=
          item.item.price * item.itemAmount;
      }
      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart.cartItems)
      );
    },
    calculateTotals: (state) => {
      state.cart.amount = Object.values(
        state.cart.cartItems
      ).reduce(
        (acc, { itemAmount }) => acc + itemAmount,
        0
      );
      state.cart.total = Object.values(
        state.cart.cartItems
      ).reduce(
        (acc, { item, itemAmount }) =>
          acc + item.price * itemAmount,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalog.pending, (state) => {
        state.fetchCatalog.status =
          StatusOfRequestEnum.LOADING;
        state.fetchCatalog.error = null;
        state.fetchCatalog.data = [];
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.fetchCatalog.status =
          StatusOfRequestEnum.SUCCESS;
        state.fetchCatalog.error = null;
        state.fetchCatalog.data = action.payload;
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.fetchCatalog.error =
          action.payload || "unknown error";
        state.fetchCatalog.status =
          StatusOfRequestEnum.ERROR;
        state.fetchCatalog.data = [];
      });
  },
});

const selfSelector = (state: RootState) => state.catalog;

export const { addItem, removeItem, calculateTotals } =
  catalogSlice.actions;

export const fetchCatalogSelector = createSelector(
  selfSelector,
  (state) => state.fetchCatalog
);
export const cartSelector = createSelector(
  selfSelector,
  (state) => state.cart
);

export default catalogSlice.reducer;

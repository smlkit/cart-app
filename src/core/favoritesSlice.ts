import {
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ItemType } from "../utils/types";

type FavoritesState = {
  favorites: ItemType[];
};

const favoriteItems =
  JSON.parse(localStorage.getItem("favorites") || "[]") ||
  [];

const initialState: FavoritesState = {
  favorites: favoriteItems,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (
      state,
      action: PayloadAction<ItemType>
    ) => {
      const itemId = action.payload.id;
      const item = state.favorites.find(
        (item) => item.id === itemId
      );
      if (!item) {
        state.favorites.push(action.payload);
        localStorage.setItem(
          "favorites",
          JSON.stringify(state.favorites)
        );
      }
    },
    removeFavorite: (
      state,
      action: PayloadAction<ItemType>
    ) => {
      const itemId = action.payload.id;
      state.favorites = state.favorites.filter(
        (item) => item.id !== itemId
      );
      localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites)
      );
    },
  },
});

const selfSelector = (state: RootState) => state.favorites;

export const { addFavorite, removeFavorite } =
  favoritesSlice.actions;

export const favoritesSelector = createSelector(
  selfSelector,
  (state) => state.favorites
);

export default favoritesSlice.reducer;

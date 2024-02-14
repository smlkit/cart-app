export const enum StatusOfRequestEnum {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type ItemType = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export type Response = {
  items: ItemType[];
};

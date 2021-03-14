import create from "zustand";
import { LOCAL_STORAGE_KEY } from "../constants";

export const useData = create((set) => ({
  data: {
    tasks: {},
    lists: {},
    listOrder: [],
  },
  // update data updates the state and persists it in localstorage
  updateData: (data) =>
    set(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      return { data };
    }),
}));

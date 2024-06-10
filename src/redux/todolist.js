import { createSlice } from "@reduxjs/toolkit";

export const todolistSlice = createSlice({
  name: "todolist",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: [],
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    loadMore: (state, action) => {
      return [...state, ...action.payload];
    },
    load: (state, action) => {
      return [...action.payload];
    },
  },
});

export const { add, loadMore, load } = todolistSlice.actions;

export default todolistSlice.reducer;

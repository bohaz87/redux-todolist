import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addTodo = createAsyncThunk("todolist/add", async (payload) => {
  const newTodo = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: payload,
      completed: false,
      userId: 5,
    }),
  }).then((res) => res.json());
  return newTodo;
});

export const todolistSlice = createSlice({
  name: "todolist",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: [],
  reducers: {
    loadMore: (state, action) => {
      state.push(...action.payload);
    },
    load: (state, action) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.unshift(action.payload);
    });
  },
});

export const { loadMore, load } = todolistSlice.actions;

export default todolistSlice.reducer;

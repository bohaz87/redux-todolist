import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import todoListReducer from "./redux/todolist";

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    todos: [
      {
        id: 1,
        todo: "Do something nice for someone I care about",
        completed: true,
        userId: 26,
      },
    ],
  },
  reducer: {
    todos: todoListReducer,
  },
});

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

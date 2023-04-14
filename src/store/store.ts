import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slices/modals-slice";
import postReducer from "../slices/posts-slice";

export const store = configureStore({
  reducer: {
    modals: modalReducer,
    posts: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slices/post-slice";
import modalReducer from "../slices/modal-slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

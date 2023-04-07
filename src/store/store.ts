import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slices/modal-slice";
import uploadFileReducer from "../slices/upload-file-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    uploadFile: uploadFileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export interface UploadPostState {
  caption?: string;
  files?: UploadFileState[];
}
export interface UploadFileState {
  id: string;
  name: string;
  size: number;
  type: string;
  preview: string;
  alt?: string;
}
const initialState: UploadPostState = {};

const uploadFileSlice = createSlice({
  name: "uploadPost",
  initialState,
  reducers: {
    addFiles(state, action: PayloadAction<UploadFileState[]>) {
      return Object.assign(state, { files: action.payload });
    },
    resetFiles() {
      return initialState;
    },
    updateCaption(state, action: PayloadAction<string>) {
      state.caption = action.payload;
    },
    updateAlt(state, action: PayloadAction<UploadFileState>) {
      const { id, alt } = action.payload;
      const newFiles = state.files?.map((file) =>
        file.id === id ? { ...file, alt } : file
      );
      return Object.assign(state, { files: newFiles });
    },
  },
});

export const { addFiles, resetFiles, updateCaption, updateAlt } =
  uploadFileSlice.actions;
export default uploadFileSlice.reducer;

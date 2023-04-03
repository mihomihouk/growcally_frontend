import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "../interfaces/modal-type";

interface Modal {
  type: ModalType;
  component: JSX.Element;
}
interface ModalState {
  visibleModals: Modal[];
}
const initialState: ModalState = {
  visibleModals: [],
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<Modal>) {
      const isModalVisible = state.visibleModals.some(
        (m) => m.type === action.payload.type
      );
      if (isModalVisible) {
        return;
      }

      state.visibleModals.push(action.payload);
    },
    hideModal(state, action: PayloadAction<Modal>) {
      state.visibleModals.filter((m) => m.type !== action.payload.type);
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;

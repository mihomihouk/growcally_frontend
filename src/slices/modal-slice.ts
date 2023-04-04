import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "../interfaces/modal-type";

interface ModalState {
  modalType: ModalType;
}
const initialState: ModalState[] = [];

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<ModalState>) {
      const { modalType } = action.payload;
      state.push({ modalType });
    },
    hideModal(state, action: PayloadAction<ModalState>) {
      const { modalType } = action.payload;
      return state.filter((m) => m.modalType !== modalType);
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;

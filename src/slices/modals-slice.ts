import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalType } from '../interfaces/modal-type';

export interface ModalState {
  modalType: ModalType;
}
const initialState: ModalState[] = [];

const modalsSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<ModalState>) {
      const { modalType } = action.payload;
      state.push({ modalType });
    },
    hideModal(state, action: PayloadAction<ModalState>) {
      const { modalType } = action.payload;
      return state.filter((m) => m.modalType !== modalType);
    }
  }
});

export const { showModal, hideModal } = modalsSlice.actions;
export default modalsSlice.reducer;

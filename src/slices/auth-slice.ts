import { createSlice } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';

export interface AuthState {
  user: User | null;
  accountId: string | null;
  isAuthenticated?: boolean;
}
const initialState: AuthState = {
  user: null,
  accountId: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    resetAuth(state) {
      state.accountId = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    updateUser(state, action) {
      const payload = action.payload;
      state.user = { ...state.user, ...payload };
    }
  }
});

export const { setUser, setIsAuthenticated, resetAuth, updateUser } =
  authSlice.actions;
export default authSlice.reducer;

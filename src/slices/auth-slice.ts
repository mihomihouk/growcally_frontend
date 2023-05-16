import { createSlice } from '@reduxjs/toolkit';
import { User } from '../interfaces/user';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  accountId?: string;
  isAuthenticated?: boolean;
}
const initialState: AuthState = {
  user: null,
  accessToken: null,
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
    }
  }
});

export const { setUser, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;

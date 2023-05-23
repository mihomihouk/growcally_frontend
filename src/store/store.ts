import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import modalReducer from '../slices/modals-slice';
import postReducer from '../slices/posts-slice';
import authReducer from '../slices/auth-slice';
import userProfileReducer from '../slices/user-profile-slice';

export const store = configureStore({
  reducer: {
    modals: modalReducer,
    posts: postReducer,
    auth: authReducer,
    userProfile: userProfileReducer
  }
});
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return store;
};
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;

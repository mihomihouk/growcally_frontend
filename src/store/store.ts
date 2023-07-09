import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import modalReducer from '../slices/modals-slice';
import postReducer from '../slices/posts-slice';
import authReducer from '../slices/auth-slice';
import userProfileReducer from '../slices/user-profile-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
  modals: modalReducer,
  posts: postReducer,
  auth: authReducer,
  userProfile: userProfileReducer
});

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return store;
};

export const createPreloadedState = (
  customState: Partial<RootState>
): PreloadedState<RootState> => {
  return {
    modals: { ...store.getState().modals, ...customState.modals },
    posts: { ...store.getState().posts, ...customState.posts },
    auth: { ...store.getState().auth, ...customState.auth },
    userProfile: { ...store.getState().userProfile, ...customState.userProfile }
  };
};
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;

import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../interfaces/post';
import { User } from '../interfaces/user';

export interface UserProfileState {
  user: User | null;
  posts: Post[];
}
const initialState: UserProfileState = {
  user: null,
  posts: []
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile(state, action) {
      state.user = action.payload;
    },
    setUserProfilePosts(state, action) {
      state.posts = action.payload;
    },
    resetUserProfile(state) {
      state.user = null;
      state.posts = [];
    }
  }
});

export const { setUserProfile, setUserProfilePosts, resetUserProfile } =
  userProfileSlice.actions;
export default userProfileSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../interfaces/post';

interface PostsState {
  posts: Post[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}
const initialState: PostsState = {
  posts: [],
  status: 'idle',
  error: undefined
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts.push.apply(action.payload);
    },
    updatePost(state, action) {
      const { postId, data } = action.payload;
      state.posts = state.posts.map((post) => {
        return post.id === postId ? { ...post, data } : post;
      });
    },
    updatePosts(state, action) {
      state.posts = action.payload;
    }
  }
});

export const { addPost, updatePost, updatePosts } = postsSlice.actions;
export default postsSlice.reducer;

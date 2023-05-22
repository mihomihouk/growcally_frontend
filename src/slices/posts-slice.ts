import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../interfaces/post';

interface PostsState {
  posts: Post[];
  currentPost?: Post;
}
const initialState: PostsState = {
  posts: [],
  currentPost: undefined
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
        return post.id === postId ? { ...post, ...data } : post;
      });
    },
    updatePosts(state, action) {
      state.posts = action.payload;
    },
    setCurrentPost(state, action) {
      const post = state.posts.find((post) => post.id === action.payload);
      state.currentPost = post;
    }
  }
});

export const { addPost, updatePost, updatePosts, setCurrentPost } =
  postsSlice.actions;
export default postsSlice.reducer;

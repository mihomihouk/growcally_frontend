import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../interfaces/post";
import { getAllPosts } from "../api/media.service";

interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}
const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: undefined,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", getAllPosts);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {
      state.posts.push.apply(action.payload);
    },
    updatePost(state, action) {
      const { id, caption } = action.payload;
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.caption = caption;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload) {
          //This code run twice so we replace the posts array with newest fetched array data
          state.posts = action.payload;
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addPost, updatePost } = postsSlice.actions;
export default postsSlice.reducer;

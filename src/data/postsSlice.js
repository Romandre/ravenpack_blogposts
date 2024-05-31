import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("fetch-posts", async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    fetchStatus: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.fetchStatus = "success";
      })
      .addCase(fetchPosts.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.fetchStatus = "error";
      });
  },
});

export default postsSlice;

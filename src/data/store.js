import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./postsSlice";
import usersSlice from "./usersSlice";

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;

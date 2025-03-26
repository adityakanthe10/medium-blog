// creates the store

import { configureStore } from "@reduxjs/toolkit";
import { signupReducer } from "../features/signup";
// ...

export const store = configureStore({
  reducer: {
    signup: signupReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];

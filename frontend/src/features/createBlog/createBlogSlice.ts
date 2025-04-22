// src/features/blog/createBlogSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createBlog } from "./createBlogAPI";
import { BlogResponse, CreateBlogPayload } from "./createBlogType";

interface BlogState {
  loading: boolean;
  error: string | null;
  blog: BlogResponse | null;
}

const initialState: BlogState = {
  loading: false,
  error: null,
  blog: null,
};

// asyncThunk
export const createBlogAsync = createAsyncThunk(
  "blog/create",
  async (payload: CreateBlogPayload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token") || "";
      return await createBlog(payload, token);
    } catch (err: unknown) {
      if (err instanceof Error) {
        // If the error is an AxiosError (assuming Axios is used)
        const error = err as Error & { response?: { data?: { message?: string } } };
        return rejectWithValue(error.response?.data?.message || error.message);
      }}
    }
);

const createBlogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlogAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload ?? null;
      })
      .addCase(createBlogAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default createBlogSlice.reducer;

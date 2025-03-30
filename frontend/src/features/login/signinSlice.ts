import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signinAPI } from "./signinAPI";
import { SigninInput } from "./signinTypes";

// interface signinState
interface SigninState {
  loading: boolean;
  error: string | null;
}

// initial state
const initialState: SigninState = {
  loading: false,
  error: null,
};

// Create aync thunk for signin

export const signinUser = createAsyncThunk(
  "auth/signin",
  async (data: SigninInput, { rejectWithValue }) => {
    try {
      const response = await signinAPI(data);
      localStorage.setItem("token", response.token);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Signup failed. Unknown error occured");
    }
  }
);

// Create signin Slice
const signinSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state) => {
        state.loading = false;
        // state.user = action.payload;
        state.error = null;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default signinSlice.reducer;

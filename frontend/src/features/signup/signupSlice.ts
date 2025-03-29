import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupAPI } from "./signupAPI";
import { SignupInput } from "./signupTypes";

interface SignupState {
  loading: boolean;
  error: string | null;
}

const initialState: SignupState = {
  loading: false,
  error: null,
};

// Async Thunk to handle signup
export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (data: SignupInput, { rejectWithValue }) => {
    try {
      const response = await signupAPI(data);
      localStorage.setItem("token", response.token);
      return response;
    } catch (error: unknown) {
      console.log("error slice", error);
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Signup failed. Unknown error occurred.");
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default signupSlice.reducer;

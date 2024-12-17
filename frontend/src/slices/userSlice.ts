import { createSlice } from "@reduxjs/toolkit";
import type { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/User";
import { signIn, signOut, signUp } from "../thunks/userThunks";

const initialState: UserState = {
  user: false,
  loading: false,
  error: null
}

const handleAsyncCases = <T, P>(
  builder: any,
  asyncThunk: AsyncThunk<T, P, {}>,
  stateKey: keyof UserState
) => {
   builder
    .addCase(asyncThunk.pending, (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(asyncThunk.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state[stateKey] = action.payload;
    })
    .addCase(asyncThunk.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    });
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    handleAsyncCases(builder, signUp, 'user');
    handleAsyncCases(builder, signIn, "user")
    handleAsyncCases(builder, signOut, "user")
  },
}) 

export default userSlice.reducer
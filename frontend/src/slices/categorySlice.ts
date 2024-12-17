import { AsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "../types/Category";
import { getAllCategories } from "../thunks/categoryThunks";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
}

const handleAsyncCases = <T, P>(
  builder: any,
  asyncThunk: AsyncThunk<T, P, {}>,
  stateKey: keyof CategoryState
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

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
    handleAsyncCases(builder, getAllCategories, 'categories');
  },
})

export default categorySlice.reducer
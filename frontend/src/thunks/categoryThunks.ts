import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategoriesService } from "../services/categories-services";

export const getAllCategories = createAsyncThunk('categories/getAllCategories', async (_, { rejectWithValue }) => {
  try {
    const data = await getAllCategoriesService()
    return data
  } catch (error) {
    return rejectWithValue(error)
  }  
})
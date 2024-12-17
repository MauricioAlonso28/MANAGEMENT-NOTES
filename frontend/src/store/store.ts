import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice'
import noteReducer from '../slices/noteSlice'
import categoryReducer from '../slices/categorySlice'

export const store = configureStore({
  reducer: {
    userState: userReducer,
    noteState: noteReducer,
    categoryState: categoryReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
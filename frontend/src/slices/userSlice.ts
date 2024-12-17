import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
}

const initialState: UserState = {
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: () => {

    }
  }
}) 

export const { login } = userSlice.actions
export default userSlice.reducer
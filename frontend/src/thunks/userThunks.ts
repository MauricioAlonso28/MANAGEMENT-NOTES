import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInService, signOutService, signUpService } from "../services/users.services";
import { User } from "../types/User";

export const signUp = createAsyncThunk<
  any,
  User,
  { rejectValue: unknown }
>('auth/signUp', async (user, {rejectWithValue}) => {
  try {
    const data = await signUpService(user);
    return data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const signIn = createAsyncThunk<
  any,
  User,
  { rejectValue: unknown }
>('auth/signIn', async (user, {rejectWithValue}) => {
  try {
    const data = await signInService(user);
    return data;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const signOut = createAsyncThunk('auth/signOut', async (_, {rejectWithValue}) => {
  try {
    const data = await signOutService();
    return data;
  } catch (error) {
    return rejectWithValue(error)
  }
})
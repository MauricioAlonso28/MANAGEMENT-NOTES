import { AsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NoteState } from "../types/Note";
import { deleteNote, getAllNotes, getArchivedNotes, getCategory, getNoteById, getNotesByCategory, postNote, updateCategoriesFromNote, updateNote } from "../thunks/noteThunks";

const initialState: NoteState = {
  category: "",
  allNotes: [],
  notes: [],
  notesArchived: [],
  noteDetails: {},
  loading: false,
  error: null
}

const handleAsyncCases = <T, P>(
  builder: any,
  asyncThunk: AsyncThunk<T, P, {}>,
  stateKey: keyof NoteState
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

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
    handleAsyncCases(builder, getAllNotes, "notes")
    handleAsyncCases(builder, getArchivedNotes, "notesArchived")
    handleAsyncCases(builder, getNoteById, "noteDetails")
    handleAsyncCases(builder, getNotesByCategory, "allNotes")
    handleAsyncCases(builder, getCategory, "category")
    handleAsyncCases(builder, updateNote, "noteDetails")
    handleAsyncCases(builder, postNote, "noteDetails")
    handleAsyncCases(builder, updateCategoriesFromNote, "noteDetails")
    handleAsyncCases(builder, deleteNote, "noteDetails")
  }
}) 

export default noteSlice.reducer
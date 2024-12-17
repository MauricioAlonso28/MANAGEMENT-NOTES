import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteCategoryFromNoteService, deleteNoteService, getAllNotesService, getArchivedNotesService, getNoteByIdService, getNotesByCategoryService, postNoteService, updateNoteService } from "../services/notes-services";
import { Note, UpdateCategoriesPayload, UpdateNotePayload } from "../types/Note";

export const getAllNotes = createAsyncThunk('notes/getAllNotes', async (_, { rejectWithValue }) => { 
  try {
    const data = await getAllNotesService();
    return data; 
  } catch (error) {
    return rejectWithValue(error);
  }
})

export const getArchivedNotes = createAsyncThunk('notes/getArchivedNotes', async (_, { rejectWithValue }) => { 
  try {
    const data = await getArchivedNotesService();
    return data; 
  } catch (error) {
    return rejectWithValue(error);
  }
})

export const getNoteById = createAsyncThunk<
  number,
  number,
  { rejectValue: unknown }
>('notes/getNoteById', async (id, { rejectWithValue }) => {
  try {
    const data = await getNoteByIdService(id)
    
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getNotesByCategory = createAsyncThunk<
  Note,
  string,
 { rejectValue: unknown }
>('notes/getNotesByCategory', async (category, { rejectWithValue }) => {
  try {
    const data = await getNotesByCategoryService(category)
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getCategory = createAsyncThunk<
  any,
  string,
 { rejectValue: unknown }
>('notes/getCategory', async (category, { rejectWithValue }) => {
  try {
    return category
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const updateNote = createAsyncThunk<
  Note,
  UpdateNotePayload,
 { rejectValue: unknown }
>('notes/updateNote', async ({ id, note }, { rejectWithValue }) => {
  try {
    const data = await updateNoteService({ id, note })
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const updateCategoriesFromNote = createAsyncThunk<
  Note,
  UpdateCategoriesPayload,
 { rejectValue: unknown }
>('notes/deleteCategoryFromNote', async ({ id, category }, { rejectWithValue }) => {
  try {
    const data = await deleteCategoryFromNoteService({ id, category })
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const postNote = createAsyncThunk<
  Note,
  any,
  { rejectValue: unknown }
>('notes/postNotes', async (note, { rejectWithValue}) => {
  try {
    const data = await postNoteService(note)
    return data
  } catch (error) {
    return rejectWithValue(error)
  }  
})

export const deleteNote = createAsyncThunk<
  any,
  number,
  { rejectValue: unknown }
>('notes/deleteNoteById', async (id, { rejectWithValue }) => {
  try {
    const data = await deleteNoteService(id)
    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})
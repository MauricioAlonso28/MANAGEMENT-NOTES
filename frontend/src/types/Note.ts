import { Category } from "./Category";

export type UpdateCategoriesPayload = {
  id: number; 
  category: string 
}

export type UpdateNotePayload = {
  id: number; 
  note: Note 
};

export interface Note  {
  id: number
  title: string;
  content: string;
  archived: boolean;
  categories: Category[]; 
  createdAt: string; 
}

export interface NoteState {
  category: string,
  allNotes: Note[]
  notes: Note[]
  notesArchived: Note[]
  noteDetails: Note | {}
  loading: boolean
  error: string | null
}
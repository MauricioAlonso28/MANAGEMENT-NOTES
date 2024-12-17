import { Note } from "./Note";

export interface CategoryState {
  categories: Category[]
  loading: boolean
  error: string | null
}

export interface Category {
  id: number
  name: string
  notes: Note[]
}
import { Note } from "../types/Note"
import axiosInstance from "../utils/axiosInstance"

export const getAllNotesService = async () => {
  try {
    const { data } = await axiosInstance.get('/notes')
    return(data)
  } catch (error) {
    return(error)
  }
}

export const getArchivedNotesService = async () => {
  try {
    const { data } = await axiosInstance.get('/notes/archived')
    return(data)
  } catch (error) {
    return(error)
  }
}

export const getNoteByIdService = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/notes/${id}`)
    return data
  } catch (error) {
    return error
  }
}

export const getNotesByCategoryService = async (category: string) => {
  try {
    const { data } = await axiosInstance.get(`/notes/category/${category}`)
    return data
  } catch (error) {
    return error
  }
}

export const updateNoteService = async ({ id, note }: {id: number, note: Note}) => {
  try {
    const { data } = await axiosInstance.patch(`/notes/${id}`, note)
    return data
  } catch (error) {
    return error
  }
}

export const postNoteService = async (note: Note) => {
  try {
    const { data } = await axiosInstance.post('/notes', note)
    return data
  } catch (error) {
    return error
  }
}

export const deleteCategoryFromNoteService = async ({ id, category }: { id: number, category: string }) => {
  try {
    const { data } = await axiosInstance.patch(`/notes/category/${id}`, { category })
    return data
  } catch (error) {
    return error
  }
}

export const deleteNoteService = async (id: number) => {
  try {
    await axiosInstance.delete(`/notes/${id}`)
    return {}
  } catch (error) {
    return error
  }
}
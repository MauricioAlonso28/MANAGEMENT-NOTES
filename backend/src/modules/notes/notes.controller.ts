import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './notes.entity';
import { handleError } from '@/utils/error-handler.util';

@Controller('notes') 
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get() 
  async getAllNotes() {
    try {
      return this.notesService.getAllNotesService();
    } catch (error) {
      return handleError(error)
    }
  }

  @Get("/archived")
  async getNotesAchived() {
    try {
      return this.notesService.getNotesAchivedService()
    } catch (error) {
      return handleError(error)
    }
  }

  @Get('/:id')
  async getNoteById(@Param() Param: {
    id: number
  }) {
    try {
      if (!Param.id) throw new Error("The ID's note is missing") 
      
      return this.notesService.getNoteByIdService(Param.id)
    } catch (error) {
      return handleError(error)
    }
  }

  @Get('/category/:name')
  async getNotesByCategory(
    @Param('name') category: string
  ) {
    try {
      if(!category) throw new Error("The category is missing")

      return this.notesService.getNotesByCategoryService(category)
    } catch (error) {
      return handleError(error)
    }
  }

  @Post() 
  async createNote(@Body() body: {
    title: string;
    content: string
    categories: string[]
  }) {
    try {
      return this.notesService.createNoteService(body.title, body.content, body.categories);
    } catch (error) {
      return handleError(error)
    }
  }

  @Patch('/:id')
  async updateNote(
    @Param("id") noteId: number,
    @Body() updateData: Partial<Note>
  ){
    try {
      if(!noteId) throw new Error("The ID's note is missing")

      return this.notesService.updateNoteService(noteId, updateData)
    } catch (error) {
      return handleError(error)
    }
  }

  @Patch('/category/:id')
  async deleteCategoryFromNote(
    @Param("id") noteId: number ,
    @Body() Body: { category: string }
  ){
    try {
      if (!noteId) throw new Error("The ID's note is missing")
      if (!Body.category) throw new Error("The category is missing")

      return this.notesService.deleteCategoryFromNoteService(noteId, Body.category)
    } catch (error) {
      return handleError(error)
    }
  }

  @Delete("/:id")
  async deleteNote(@Param("id") noteId: number) {
    try {
      if (!noteId) throw new Error("The ID's note is missing")
      
      const resultNote = await this.notesService.deleteNoteService(noteId)

      return { message: resultNote }
    } catch (error) {
      return handleError(error)
    }
  }
}
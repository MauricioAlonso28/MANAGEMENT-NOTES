import { Controller, Get, Post, Body, Param, Patch, Delete, Query, Res, Req } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './notes.entity';
import { handleError } from '@/utils/error-handler.util';
import { ExtendedRequest } from '@/types/extended-request';

@Controller('notes') 
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get() 
  async getAllNotes(
    @Req() req: ExtendedRequest
  ) {
    try {
      return this.notesService.getAllNotesService(req.user);
    } catch (error) {
      return handleError(error)
    }
  }

  @Get("/archived")
  async getNotesAchived(
    @Req() req: ExtendedRequest
  ) {
    try {
      return this.notesService.getNotesAchivedService(req.user)
    } catch (error) {
      return handleError(error)
    }
  }

  @Get('/:id')
  async getNoteById(
    @Param() Param: { id: number },
    @Req() req: ExtendedRequest
  ) {
    try {
      if (!Param.id) throw new Error("The ID's note is missing") 
      
      return this.notesService.getNoteByIdService(Param.id, req.user)
    } catch (error) {
      return handleError(error)
    }
  }

  @Get('/category/:name')
  async getNotesByCategory(
    @Param('name') category: string,
    @Req() req: ExtendedRequest
  ) {
    try {
      if(!category) throw new Error("The category is missing")

      return this.notesService.getNotesByCategoryService(category, req.user)
    } catch (error) {
      return handleError(error)
    }
  }

  @Post() 
  async createNote(
    @Body() body: {
      title: string;
      content: string
      categories: string[]
    },
    @Req() req: ExtendedRequest
  ) {
    try {
      return this.notesService.createNoteService(body.title, body.content, body.categories,req.user);
    } catch (error) {
      return handleError(error)
    }
  }

  @Patch('/:id')
  async updateNote(
    @Param("id") noteId: number,
    @Body() updateData: Partial<Note>,
    @Req() req: ExtendedRequest
  ){
    try {
      if(!noteId) throw new Error("The ID's note is missing")

      return this.notesService.updateNoteService(noteId, updateData, req.user)
    } catch (error) {
      return handleError(error)
    }
  }

  @Patch('/category/:id')
  async deleteCategoryFromNote(
    @Param("id") noteId: number ,
    @Body() Body: { category: string },
    @Req() req: ExtendedRequest
  ){
    try {
      if (!noteId) throw new Error("The ID's note is missing")
      if (!Body.category) throw new Error("The category is missing")

      return this.notesService.deleteCategoryFromNoteService(noteId, Body.category, req.user)
    } catch (error) {
      return handleError(error)
    }
  }

  @Delete("/:id")
  async deleteNote(
    @Param("id") noteId: number,
    @Req() req: ExtendedRequest
  ) {
    try {
      if (!noteId) throw new Error("The ID's note is missing")
      
      const resultNote = await this.notesService.deleteNoteService(noteId,req.user)

      return { message: resultNote }
    } catch (error) {
      return handleError(error)
    }
  }
}
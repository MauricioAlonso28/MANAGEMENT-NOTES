import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Note } from './notes.entity';
import { Category } from '../categories/categories.entity';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { User } from '../users/users.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getAllNotesService(
    userReqId: UUID
  ): Promise<Note[]> {
    return this.notesRepository.find({
      where: { archived: false,  user: {id: userReqId}},
      relations: ['categories']
    });
  }

  async getNotesAchivedService(
    userReqId: UUID
  ): Promise<Note[]> {
    return this.notesRepository.find({
      where: { archived: true, user: { id: userReqId } },
      relations: ['categories']
    });
  }

  async getNoteByIdService(
    id: number,
    userReqId: UUID
  ): Promise<Note> {
    const noteFound = await this.notesRepository.findOne({
      where: { id: id, user: {id: userReqId} }, 
      relations: ['categories'],
    });

    if (!noteFound) throw new NotFoundException(`Note with ID ${id} not found`)
    
    return noteFound
  }

  async getNotesByCategoryService(
    category: string,
    userReqId: UUID
  ): Promise<Note[]> {      
    const categoryToLowerCase = category.toLowerCase()
    const allNotes = await this.notesRepository.find({
      where: {user: {id: userReqId}},
      relations: ['categories']
    });
    
    const notesFiltered = allNotes.filter((note) => {
      return note.categories.find(cat => cat.name.toLowerCase() === categoryToLowerCase)
    })

    return notesFiltered
  }

  async createNoteService(
    title: string,
    content: string,
    categoryNames: string[],
    userReqId: UUID
  ): Promise<Note> {
    const categories = await Promise.all(
      categoryNames.map(async (name) => {
        let nameToLowerCase = name.toLowerCase()
        let category = await this.categoriesRepository.findOne({
          where: {
            name: nameToLowerCase
          }
        });
        if (!category) {
          category = this.categoriesRepository.create({ name: nameToLowerCase });
          await this.categoriesRepository.save(category);
        }
        return category;
      }),
    );
    
    const userFound: any = await this.usersRepository.findOne({
      where: { id: userReqId },
      select: ['id', 'email']
    })
    
    const note = this.notesRepository.create({ title, content, categories, user: userFound });
    
    return this.notesRepository.save(note);
  }

  async updateNoteService(
    noteId: number,
    updateNote: Partial<Note>,
    userReqId: UUID
  ): Promise<Note> {
    const noteFound = await this.notesRepository.findOne({
      where: { id: noteId, user: {id: userReqId} },
      relations: ['categories']
    }) 

    if (!noteFound) throw new NotFoundException(`Note with ID ${noteId} not found`)
    
    Object.assign(noteFound, updateNote)

    return this.notesRepository.save(noteFound)
  }

  async deleteCategoryFromNoteService(
    noteId: number,
    category: string,
    userReqId: UUID
  ): Promise<Note>{
    const noteFound = await this.notesRepository.findOne({
      where: { id: noteId, user: {id: userReqId}},
      relations: ['categories']
    }) 

    if (!noteFound) throw new NotFoundException(`Note with ID ${noteId} not found`)
    
    noteFound.categories = noteFound.categories.filter((cat) => {
      return cat.name.toLowerCase() != category.toLowerCase()
    })

    return this.notesRepository.save(noteFound)
  }

  async deleteNoteService(
    id: number,
    userReqId: UUID
  ): Promise<string> {
    const noteFound = await this.notesRepository.findOneBy({
      id: id,
      user: { id: userReqId }
    })

    if (!noteFound) throw new NotFoundException(`Note with ID ${id} not found`)
    
    await this.notesRepository.remove(noteFound)

    return `Note with ID ${id} has been successfully deleted`
  }
}
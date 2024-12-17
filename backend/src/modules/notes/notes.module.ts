import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './notes.entity';
import { Category } from '../categories/categories.entity';
import { UserMiddleware } from '@/middleware/Auth.middleware';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Category, User])], 
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .forRoutes(NotesController)
  }
}
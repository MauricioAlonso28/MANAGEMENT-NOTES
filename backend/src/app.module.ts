import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './databases/database.module';
import { NotesModule } from './modules/notes/notes.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    NotesModule,
    CategoriesModule,
    AuthModule
  ]
})
export class AppModule {}
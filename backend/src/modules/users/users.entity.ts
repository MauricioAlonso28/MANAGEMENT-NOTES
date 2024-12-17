import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";
import { Note } from "../notes/notes.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: UUID;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
    
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
};
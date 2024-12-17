import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../categories/categories.entity';

@Entity('notes') 
export class Note {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ length: 255 }) 
  title: string;

  @Column('text') 
  content: string;

  @Column({ default: false }) 
  archived: boolean;

  @ManyToMany(() => Category, (category) => category.notes, {
    cascade: true, 
  })
    
  @JoinTable() 
  categories: Category[];
    
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date;
}
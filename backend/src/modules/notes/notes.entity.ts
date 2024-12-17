import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { User } from '../users/users.entity';

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
    
  @ManyToOne(() => User, (user) => user.notes, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: 'userId' })
  user: User;

    
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  createdAt: Date;
}
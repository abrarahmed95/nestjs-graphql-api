import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workspaces')
export class Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true, unique: true })
  slug: string;

  @ManyToOne(() => User, (user) => user.workspaces)
  user: User;

  @BeforeInsert()
  createSlug() {
    this.slug = this.name.split(' ')[0].slice(0, 3).toUpperCase();
  }
}

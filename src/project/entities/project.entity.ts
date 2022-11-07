import { ApiProperty } from '@nestjs/swagger';
import { IsDate, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(15)
  @Column({ nullable: false })
  name: string;

  @ApiProperty()
  @ManyToOne(() => Workspace, (Workspace) => Workspace.projects, {
    onDelete: 'CASCADE',
  })
  workspace: Workspace;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.projects)
  owner: User;

  @ApiProperty()
  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @UpdateDateColumn()
  updatedAt: Date;
}

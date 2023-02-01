import { Team } from './../../team/entities/team.entity';
import { Task } from './../../task/entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './../../project/entities/project.entity';
import { Tag } from './tag.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('workspaces')
@ObjectType()
@Index(['slug'])
export class Workspace {
  @ApiProperty()
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Field()
  @Column({ nullable: false, unique: true })
  name: string;

  @ApiProperty()
  @Field()
  @Column({ nullable: true, unique: true })
  slug: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.workspaces)
  user: User;

  @OneToMany(() => Project, (project) => project.workspace, {
    cascade: true,
  })
  projects: Project[];

  @OneToMany(() => Task, (task) => task.workspace, {
    cascade: true,
  })
  tasks: Task[];

  @OneToMany(() => Tag, (tag) => tag.workspace, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => [Tag], { nullable: true })
  tags: Tag[];

  @OneToMany(() => Team, (team) => team.workspace, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @Field((type) => [Team], { nullable: true, defaultValue: [] })
  teams: Team[];

  @ApiProperty()
  @IsDate()
  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  createSlug() {
    // this.slug = this.name.split(' ')[0].slice(0, 3).toUpperCase();
  }
}

import { Team } from './../../team/entities/team.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Priority {
  LOW,
  MEDIUM,
  HIGH,
}

registerEnumType(Priority, {
  name: 'Priority',
});

@ObjectType()
@Entity('tasks')
export class Task {
  @ApiProperty()
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Field()
  @Column({ nullable: false })
  title: string;

  @ApiProperty()
  @Field()
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Field()
  @Column({ nullable: false, default: false })
  completed: boolean;

  @Field()
  @Column({ type: 'timestamptz', nullable: true })
  completedAt: string;

  @Field()
  @Column({ nullable: true })
  creatorId?: string;

  @Exclude()
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'SET NULL',
  })
  creator: User;

  @ManyToOne((type) => Workspace, (workspace) => workspace.tasks, {
    onDelete: 'SET NULL',
  })
  workspace: Workspace;

  @Field({ nullable: true })
  @Column({ nullable: true })
  teamId?: string;

  @ManyToOne((type) => Team, (team) => team.tasks, {
    onDelete: 'SET NULL',
  })
  team: Team[];

  @ApiProperty()
  @Field()
  @Column({ nullable: true })
  parentId: string;

  @Field((type) => Task, { nullable: true })
  @ManyToOne(() => Task, (task) => task.subTasks, {
    onDelete: 'SET NULL',
  })
  parent: Task;

  @ApiProperty({ type: () => [Task] })
  @Field((type) => [Task], { nullable: true })
  @OneToMany(() => Task, (task) => task.parent, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  subTasks: Task[];

  @Field((type) => [User], { nullable: true })
  @ManyToMany(() => User, {
    onDelete: 'SET NULL',
  })
  @JoinTable({ name: 'task_assignee' })
  assignee: User[];

  @ApiProperty()
  @Field()
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty()
  @Field()
  @UpdateDateColumn()
  updatedAt: string;

  @ApiProperty()
  @Field((type) => Priority, {
    defaultValue: Priority.LOW,
  })
  @Column({
    type: 'enum',
    enum: Priority,
    default: Priority.LOW,
  })
  priority: Priority;

  @ApiProperty()
  @Field()
  @Column({ type: 'timestamptz', nullable: true })
  startedAt?: string;

  @Field()
  @Column({ type: 'timestamptz', nullable: true })
  endedAt?: string;
}

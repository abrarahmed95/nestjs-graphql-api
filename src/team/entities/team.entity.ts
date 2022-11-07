import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from 'src/task/entities/task.entity';

@Entity('teams')
@ObjectType()
export class Team {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => String)
  id: string;

  @ApiProperty()
  @Column({ nullable: false })
  @Field((type) => String)
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  @Field(() => String)
  workspaceId?: string;

  @Exclude()
  @ManyToOne(() => Workspace, (workspace) => workspace.teams)
  workspace: Workspace;

  @ApiProperty({ type: () => [Task] })
  @OneToMany(() => Team, (team) => team.tasks)
  tasks: Task[];
}

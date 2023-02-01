import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Task } from 'src/task/entities/task.entity';
import { Project } from 'src/project/entities/project.entity';

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
  @Field((type) => String)
  teamId: string;

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

  @ManyToMany(() => Project, (project) => project.teams)
  @JoinTable({ name: 'team_projects' })
  projects: Project[];

  @BeforeInsert()
  @BeforeUpdate()
  updateTeamId() {
    this.teamId = this.name.slice(0, 2).toUpperCase();
  }
}

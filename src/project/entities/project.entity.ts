import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, MaxLength, MinLength } from 'class-validator';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/user/entities/user.entity';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
@ObjectType()
export class Project {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ApiProperty()
  @MinLength(3)
  @MaxLength(15)
  @Column({ nullable: false })
  @Field()
  name: string;

  @ApiProperty()
  @ManyToOne(() => Workspace, (Workspace) => Workspace.projects, {
    onDelete: 'CASCADE',
  })
  @Field(() => Workspace)
  workspace: Workspace;

  @Field(() => [Team], { nullable: true })
  @ManyToMany(() => Team, (team) => team.projects)
  teams?: Team[];

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user.projects)
  @Field(() => User)
  owner: User;

  @ApiProperty()
  @IsDate()
  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @UpdateDateColumn()
  @Field(() => String)
  updatedAt: Date;
}

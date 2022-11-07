import { Project } from './../../project/entities/project.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Task } from './../../task/entities/task.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Field()
  @Column({ nullable: false, unique: true })
  @Index({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ nullable: false })
  @ApiHideProperty()
  @Exclude()
  password: string;

  @Field()
  @Column({ nullable: false, unique: true })
  @ApiProperty()
  username: string;

  @Field()
  @Column({ nullable: true, default: false })
  @ApiProperty()
  verified: boolean;

  @Field((type) => [Workspace], { nullable: true })
  @OneToMany(() => Workspace, (workspace) => workspace.user, {
    cascade: true,
  })
  workspaces: Workspace[];

  @OneToMany(() => Project, (project) => project.owner, {
    cascade: true,
  })
  projects: Project[];

  @OneToMany(() => Task, (task) => task.creator)
  tasks: Task[];

  @BeforeInsert()
  async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password || password, salt);
    this.password = hash;
  }

  async comparePassword(password: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, this.password);

    if (!isMatch) {
      throw new UnauthorizedException('Passwords do not match');
    }

    return isMatch;
  }
}

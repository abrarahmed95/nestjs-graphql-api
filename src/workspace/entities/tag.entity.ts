import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Workspace } from 'src/workspace/entities/workspace.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tags')
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String)
  @Column({ nullable: false })
  name: string;

  @Field(() => String)
  @Column({ nullable: false })
  color: string;

  @Field(() => String)
  @Column({ nullable: true })
  workspaceId?: string;

  @Exclude()
  @ManyToOne(() => Workspace, (workspace) => workspace.tags)
  workspace: Workspace;
}

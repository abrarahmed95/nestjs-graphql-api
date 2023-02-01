import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('views')
export class View {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

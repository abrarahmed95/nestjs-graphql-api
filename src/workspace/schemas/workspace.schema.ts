import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WorkspaceDocument = Workspace & Document;

@Schema()
export class Workspace {
  @Prop({ required: true })
  name: string;

  @Prop()
  slug: string;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);

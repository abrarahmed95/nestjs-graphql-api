import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

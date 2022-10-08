import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ForgetPasswordDocument = ForgetPasswordModel & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class ForgetPasswordModel {
  @Prop({
    required: true,
  })
  email: string;

  @Prop({ required: true })
  verification: string;

  @Prop({ required: true })
  expires: Date;

  @Prop()
  ip: string;

  @Prop({ default: false })
  firstUsed: boolean;

  @Prop({ default: false })
  finalUsed: boolean;
}

export const ForgetPasswordSchmea =
  SchemaFactory.createForClass(ForgetPasswordModel);

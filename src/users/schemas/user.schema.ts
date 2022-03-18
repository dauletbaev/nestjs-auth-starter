import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop(String)
  first_name: string;

  @Prop(String)
  last_name: string;

  @Prop({
    type: String,
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop(String)
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

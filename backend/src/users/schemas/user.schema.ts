import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  public username!: string;

  @Prop()
  public password!: string;

  @Prop()
  public isModerator!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

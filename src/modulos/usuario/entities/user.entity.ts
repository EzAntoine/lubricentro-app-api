import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

//export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ unique: true })
  username: string;
  @Prop()
  password: string;
  /*  @Prop({ type: [{ type: [Types.ObjectId], ref: 'Order' }] })
  orders: Types.Array<Order>;
  @Prop({
    type: String,
    enum: ['admin', 'invitado'],
  })
  role: string; */
}

export const UserSchema = SchemaFactory.createForClass(User);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Order } from 'src/modulos/orden/entities/order.entity';

@Schema()
export class User extends Document {
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop({ type: [{ type: [Types.ObjectId], ref: 'Order' }] })
  orders: Types.Array<Order>;
}

export const UserSchema = SchemaFactory.createForClass(User);

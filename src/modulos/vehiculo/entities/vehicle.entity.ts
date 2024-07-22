import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Order } from 'src/modulos/orden/entities/order.entity';

@Schema()
export class Vehicle extends Document {
  @Prop()
  ownerId: string;
  @Prop()
  brand: string;
  @Prop()
  modelo: string;
  @Prop()
  year: string;
  @Prop()
  plate: string;
  @Prop()
  details: string;
  @Prop({ type: [{ type: [Types.ObjectId], ref: 'Order' }] })
  orders: Types.Array<Order>;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Types } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ type: Date })
  date: Date;
  @Prop({ type: Types.ObjectId, ref: 'Client' })
  clientId: Types.ObjectId;
  @Prop()
  vehiclePlate: string;
  @Prop()
  failure: string;
  @Prop()
  estimateSolution: string;
  @Prop()
  price: number;
  @Prop({
    type: String,
    enum: ['Pendiente', 'Realizado', 'Retirado', 'Demorado'],
  })
  status: string;
  @Prop()
  observations: string;
  /* Se puede agregar un trabajador responsable de la orden. 
  @Prop()
  responsible: string; */
}

export const OrderSchema = SchemaFactory.createForClass(Order);

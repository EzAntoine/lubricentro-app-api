import { Prop, Schema } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop()
  date: Date;
  @Prop()
  clientId: string;
  @Prop()
  vehicleId: string;
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
  state: string;
  @Prop() //Se puede agregar un enum con los trabajadores.
  responsible: string;
}

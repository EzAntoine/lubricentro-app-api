import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Vehicle } from 'src/modulos/vehiculo/entities/vehicle.entity';

@Schema()
export class Client extends Document {
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  dni: string;
  @Prop()
  phone: string;
  @Prop()
  email: string;
  @Prop()
  detail: string;
  @Prop({ type: [{ type: [Types.ObjectId], ref: 'Vehicle' }] })
  vehicles: Types.Array<Vehicle>;
}

export const ClientSchema = SchemaFactory.createForClass(Client);

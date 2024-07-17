import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

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
  @Prop({ type: [{ type: Types.ObjectId, ref: Vehicle.plate }] })
  vehicles: Types.Array<Vehicle>;
}

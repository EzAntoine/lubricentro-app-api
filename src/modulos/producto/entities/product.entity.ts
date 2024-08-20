import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ unique: true })
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
  @Prop()
  cost: number;
  @Prop()
  stock: number;
  @Prop()
  category: string;
  @Prop()
  supplier: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

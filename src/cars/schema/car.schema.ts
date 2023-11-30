import { HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema({ timestamps: true, collection: 'cars' })
export class Car {
  @Prop()
  name?: string;

  @Prop()
  images?: string[];

  @Prop()
  price?: string;

  @Prop()
  battery?: string;

  @Prop()
  range?: number;

  @Prop()
  acceleration?: string;

  @Prop()
  seats?: number;

  @Prop()
  power?: string;

  @Prop()
  speed?: number;

  @Prop()
  drive?: string;

  @Prop()
  charging?: string;
}

export const carSchema = SchemaFactory.createForClass(Car);

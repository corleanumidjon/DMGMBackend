import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car } from './schema/car.schema';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<Car>,
  ) {}

  create(createCarDto: CreateCarDto) {
    return this.carModel.create({ ...createCarDto });
  }

  findAll() {
    return this.carModel.find()
  }

  findOne(id: string) {
    return this.carModel.findById({ _id: id })
  }

  findName(name: string) {
    return this.carModel.findOne({ name });
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    return this.carModel.findByIdAndUpdate(id, updateCarDto);
  }

  remove(id: string) {
    return this.carModel.findByIdAndRemove(id);
  }
}

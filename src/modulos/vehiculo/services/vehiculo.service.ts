import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Vehicle } from '../entities/vehicle.entity';
import { Model } from 'mongoose';
import { CreateVehicleDto, UpdateVehicleDto } from '../dtos/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>,
  ) {}

  async findAll() {
    return await this.vehicleModel.find().populate('vehicles').exec();
  }

  async findOneById(id: string) {
    return await this.vehicleModel.findById(id).populate('vehicles').exec();
  }

  async create(client: CreateVehicleDto) {
    return await this.vehicleModel.create(client);
  }

  async update(id: string, client: UpdateVehicleDto) {
    return await this.vehicleModel.findByIdAndUpdate(id, client, { new: true });
  }

  async delete(id: string) {
    return await this.vehicleModel.findByIdAndDelete(id);
  }

  async addOrders(id: string, orders: string[]) {
    const vehicle = await this.vehicleModel.findById(id);
    orders.forEach((v) => vehicle.orders.push(v));
    return vehicle.save();
  }
}

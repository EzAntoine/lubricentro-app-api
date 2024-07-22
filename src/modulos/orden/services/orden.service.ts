import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../entities/order.entity';
import { Model } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdenService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async findAll() {
    return await this.orderModel
      .find()
      .populate('clientId', 'vehicleId')
      .exec();
  }

  async findOneById(id: string) {
    return await this.orderModel
      .findById(id)
      .populate('clientId', 'vehicleId')
      .exec();
  }

  async create(order: CreateOrderDto) {
    return await this.orderModel.create(order);
  }

  async update(id: string, order: UpdateOrderDto) {
    return await this.orderModel.findByIdAndUpdate(id, order, { new: true });
  }

  async delete(id: string) {
    return await this.orderModel.findByIdAndDelete(id);
  }
}

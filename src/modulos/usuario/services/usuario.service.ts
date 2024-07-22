import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find().populate('orders').exec();
  }

  async findOneById(id: string) {
    return await this.userModel.findById(id).populate('orders').exec();
  }

  async create(client: CreateUserDto) {
    return await this.userModel.create(client);
  }

  async update(id: string, client: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, client, { new: true });
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async addOrders(id: string, orders: string[]) {
    const client = await this.userModel.findById(id);
    orders.forEach((v) => client.orders.push(v));
    return client.save();
  }
}

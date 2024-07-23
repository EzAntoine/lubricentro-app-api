import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    return await this.userModel.find().populate('orders').exec();
  }

  async findOneById(id: string) {
    return await this.userModel.findById(id).populate('orders').exec();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(payload: CreateUserDto) {
    const newUser = new this.userModel(payload);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const model = await newUser.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  async update(id: string, payload: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, payload, { new: true });
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async addOrders(id: string, orders: string[]) {
    const usr = await this.userModel.findById(id);
    orders.forEach((v) => usr.orders.push(v));
    return usr.save();
  }
}

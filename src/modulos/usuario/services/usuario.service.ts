import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll() {
    return await this.userModel
      .find() /* .populate('orders') */
      .exec();
  }

  async findOneById(id: string) {
    const user = await this.userModel
      .findById(id) /* .populate('orders') */
      .exec();
    if (!user)
      throw new NotFoundException(`El usuario con id: #${id} no existe`);
    return user;
  }

  async getUser(query: object): Promise<User> {
    const user = await this.userModel
      .findOne(query)
      /* .populate('orders') */
      .exec();
    if (!user) throw new NotFoundException(`El usuario no existe`);
    return user;
  }

  async create(username: string, password: string): Promise<User> {
    return this.userModel.create({
      username,
      password,
    });
  }

  async update(id: string, payload: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (!user)
      throw new NotFoundException(`El usuario con id: #${id} no existe`);
    return await this.userModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
  }

  async delete(id: string) {
    const user = await this.userModel.findById(id);
    if (!user)
      throw new NotFoundException(`El usuario con id: #${id} no existe`);
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  /* async addOrders(id: string, orders: string[]) {
    const usr = await this.userModel.findById(id);
    if (!usr)
      throw new NotFoundException(`El usuario con id: #${id} no existe`);
    orders.forEach((v) => usr.orders.push(v));
    return usr.save();
  } */
}

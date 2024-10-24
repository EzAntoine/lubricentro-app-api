import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from '../entities/client.entity';
import { Model } from 'mongoose';
import { CreateClientDto, UpdateClientDTO } from '../dtos/client.dto';

@Injectable()
export class ClienteService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async findAll() {
    return await this.clientModel.find().populate('vehicles').exec();
  }

  async findOneById(id: string) {
    return await this.clientModel
      .findById(id) /* .populate('vehicles') */
      .exec();
  }

  async create(client: CreateClientDto) {
    return await this.clientModel.create(client);
  }

  async update(id: string, client: UpdateClientDTO) {
    return await this.clientModel.findByIdAndUpdate(id, client, { new: true });
  }

  async delete(id: string) {
    return await this.clientModel.findByIdAndDelete(id);
  }

  async addVechicles(id: string, vehiclesIds: string[]) {
    const client = await this.clientModel.findById(id);
    vehiclesIds.forEach((v) => client.vehicles.push(v));
    return client.save();
  }
}

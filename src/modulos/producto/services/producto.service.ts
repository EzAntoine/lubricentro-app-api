import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOneById(id: string) {
    return await this.productModel.findById(id).exec();
  }

  async create(product: CreateProductDto) {
    return await this.productModel.create(product);
  }

  async update(id: string, product: UpdateProductDto) {
    return await this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
  }

  async delete(id: string) {
    return await this.productModel.findByIdAndDelete(id).exec();
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { ProductoService } from '../services/producto.service';

@ApiTags('Products')
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductoController {
  constructor(private productoService: ProductoService) {}

  @ApiOperation({ summary: 'Get all products.' })
  @Get()
  getAllProducts() {
    return this.productoService.findAll();
  }
  @ApiOperation({ summary: 'Get product by ID.' })
  @Get(':id')
  getProductById(@Param('id', MongoIdPipe) id: string) {
    return this.productoService.findOneById(id);
  }
  @ApiOperation({ summary: 'Create a new product.' })
  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    return this.productoService.create(payload);
  }
  @ApiOperation({ summary: 'Update an existing product by ID.' })
  @Put(':id')
  updateProduct(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productoService.update(id, payload);
  }
  @ApiOperation({ summary: 'Delete a product by ID.' })
  @Delete(':id')
  deleteProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productoService.delete(id);
  }
}

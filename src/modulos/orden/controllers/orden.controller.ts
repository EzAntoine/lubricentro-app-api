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
import { OrdenService } from '../services/orden.service';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Orders')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdenController {
  constructor(private orderService: OrdenService) {}

  @ApiOperation({ summary: 'Get all orders.' })
  @Get()
  getOrders() {
    return this.orderService.findAll();
  }

  @ApiOperation({ summary: 'Get order by ID.' })
  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.orderService.findOneById(id);
  }

  @ApiOperation({ summary: 'Create new order.' })
  @Post()
  createOrder(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing order by ID.' })
  @Put()
  updateOrder(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an order by ID.' })
  @Delete(':id')
  deleteOrder(@Param('id', MongoIdPipe) id: string) {
    return this.orderService.delete(id);
  }
}

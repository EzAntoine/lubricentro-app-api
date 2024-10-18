import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.OK)
  async getOrders() {
    let orders = await this.orderService.findAll();
    orders = orders.reverse();
    return {
      statusCode: HttpStatus.OK,
      message: 'Order listing successful',
      data: orders,
    };
  }
  @ApiOperation({ summary: 'Get order by ID.' })
  @Get(':id')
  getOrderById(@Param('id') id: string) {
    const order = this.orderService.findOneById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order by ID successful',
      data: order,
    };
  }

  @ApiOperation({ summary: 'Create new order.' })
  @Post()
  createOrder(@Body() payload: CreateOrderDto) {
    const newOrder = this.orderService.create(payload);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order created successful',
      data: newOrder,
    };
  }

  @ApiOperation({ summary: 'Update an existing order by ID.' })
  @Put()
  updateOrder(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    const updOrder = this.orderService.update(id, payload);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order update successful',
      data: updOrder,
    };
  }

  @ApiOperation({ summary: 'Delete an order by ID.' })
  @Delete(':id')
  deleteOrder(@Param('id', MongoIdPipe) id: string) {
    const deletedOrder = this.orderService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order delete successful',
      data: deletedOrder,
    };
  }
}

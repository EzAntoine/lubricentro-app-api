import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
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
import { ClienteService } from 'src/modulos/cliente/services/cliente.service';

interface IOrder {
  _id: string;
  date: Date;
  clientId: string;
  clientName: string;
  vehiclePlate: string;
  failure: string;
  estimateSolution: string;
  price: number;
  status: string;
  observations: string;
  cratedBy: string;
}
interface IGetOrdersResponse {
  statusCode: number;
  message: string;
  data: (IOrder & { clientName: string })[]; // Include clientName in the data array
}
@ApiTags('Orders')
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdenController {
  constructor(
    private orderService: OrdenService,
    private clientService: ClienteService,
  ) {}

  @ApiOperation({ summary: 'Get all orders.' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getOrders(): Promise<IGetOrdersResponse> {
    let orders = await this.orderService.findAll();
    orders = orders.reverse();

    const ordersWithClientNames = await Promise.all(
      orders.map(async (order) => {
        const clientResponse = await this.clientService.findOneById(
          order.clientId,
        );
        if (!clientResponse) {
          throw new Error(`Client not found for ID: ${order.clientId}`);
        }

        const clientName = `${clientResponse.surname} ${clientResponse.name}`;
        const clientPhone = clientResponse.phone;
        return {
          ...order.toObject(),
          clientName,
          clientPhone,
        } as IOrder & { clientName: string; clientPhone: string };
      }),
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Order listing successful',
      data: ordersWithClientNames,
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
  async createOrder(@Body() payload: CreateOrderDto) {
    try {
      const orderNumber = (await this.getOrders()).data.length;
      const orderWithNumber = {
        ...payload,
        number: orderNumber + 1,
      };
      const newOrder = await this.orderService.create(orderWithNumber);

      return {
        statusCode: HttpStatus.OK,
        message: 'Order created successful',
        data: newOrder,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to create order',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Update an existing order by ID.' })
  @Put(':id')
  async updateOrder(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    const updOrder = await this.orderService.update(id, payload);
    return {
      statusCode: HttpStatus.OK,
      message: 'Order updated successfully',
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

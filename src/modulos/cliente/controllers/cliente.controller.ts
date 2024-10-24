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
import { ClienteService } from '../services/cliente.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateClientDto, UpdateClientDTO } from '../dtos/client.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Clients')
@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClienteController {
  constructor(private clientService: ClienteService) {}

  @ApiOperation({ summary: 'Get all clients.' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getClients() {
    const clients = await this.clientService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Client listing successful',
      data: clients,
    };
  }

  @ApiOperation({ summary: 'Get client by ID.' })
  @Get(':id')
  async getClientById(@Param('id') id: string) {
    const client = await this.clientService.findOneById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Client found successfully',
      data: client,
    };
  }

  @ApiOperation({ summary: 'Create new client.' })
  @Post()
  createClient(@Body() payload: CreateClientDto) {
    const newClient = this.clientService.create(payload);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Client created successfully',
      data: newClient,
    };
  }

  @ApiOperation({ summary: 'Update an existing client by ID.' })
  @Put(':id')
  updateClient(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateClientDTO,
  ) {
    const updateClient = this.clientService.update(id, payload);
    return {
      statusCode: HttpStatus.OK,
      message: 'Client updated successfully',
      data: updateClient,
    };
  }

  @ApiOperation({ summary: 'Remove a client by ID.' })
  @Delete(':id')
  deleteClient(@Param('id', MongoIdPipe) id: string) {
    const deletedClient = this.clientService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Client deleted successfully',
      data: deletedClient,
    };
  }

  /* @ApiOperation({ summary: 'Get clients ordered by A-Z.' })
  @Get('orderAZ')
  async getClientsOrdered() {
    const clients = await this.clientService.findAll();
    clients.sort((a, b) => a.surname.localeCompare(b.surname));
    return {
      statusCode: HttpStatus.OK,
      message: 'Client sorted A-Z successful',
      data: clients,
    };
  } */
}

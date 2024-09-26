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
import { ClienteService } from '../services/cliente.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateClientDto, UpdateClientDTO } from '../dtos/client.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
//import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Clients')
@UseGuards(JwtAuthGuard /* , RolesGuard */)
@Controller('clients')
export class ClienteController {
  constructor(private clientService: ClienteService) {}

  @ApiOperation({ summary: 'Get all clients.' })
  @Get()
  getClients() {
    return this.clientService.findAll();
  }

  @ApiOperation({ summary: 'Get client by ID.' })
  @Get(':id')
  getClientById(@Param('id') id: string) {
    return this.clientService.findOneById(id);
  }

  @ApiOperation({ summary: 'Create new client.' })
  @Post()
  createClient(@Body() payload: CreateClientDto) {
    return this.clientService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing client by ID.' })
  @Put(':id')
  updateClient(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateClientDTO,
  ) {
    return this.clientService.update(id, payload);
  }

  @ApiOperation({ summary: 'Remove a client by ID.' })
  @Delete(':id')
  deleteClient(@Param('id', MongoIdPipe) id: string) {
    return this.clientService.delete(id);
  }
}

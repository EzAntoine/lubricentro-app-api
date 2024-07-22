import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/usuario.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Users')
@Controller('users')
export class UsuarioController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all Users.' })
  @Get()
  getClients() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get client by ID.' })
  @Get(':id')
  getClientById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @ApiOperation({ summary: 'Create new client.' })
  @Post()
  createClient(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing client by ID.' })
  @Put(':id')
  updateClient(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(id, payload);
  }

  @ApiOperation({ summary: 'Remove a client by ID.' })
  @Delete(':id')
  deleteClient(@Param('id', MongoIdPipe) id: string) {
    return this.userService.delete(id);
  }
}

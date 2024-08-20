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
import { UserService } from '../services/usuario.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsuarioController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all Users.' })
  @Get()
  getUsers() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by ID.' })
  @Get(':id')
  getUserById(@Param('id', MongoIdPipe) id: string) {
    return this.userService.findOneById(id);
  }

  @ApiOperation({ summary: 'Create new user.' })
  @Public()
  @Post()
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing user by ID.' })
  @Put(':id')
  updateUser(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(id, payload);
  }

  @ApiOperation({ summary: 'Remove a user by ID.' })
  @Delete(':id')
  deleteUser(@Param('id', MongoIdPipe) id: string) {
    console.log('ingreso con id: ' + id);

    return this.userService.delete(id);
  }
}

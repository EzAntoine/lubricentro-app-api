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
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { UpdateUserDto } from '../dtos/user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import * as bcrypt from 'bcrypt';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsuarioController {
  constructor(private readonly userService: UserService) {}

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
  @Post('/signup')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<any> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.userService.create(username, hashedPassword);
    return result;
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

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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

interface IUser {
  username: string;
  password: string;
}

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsuarioController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all Users.' })
  @Get()
  async getUsers() {
    let users = await this.userService.findAll();
    users = users.reverse();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users listing successful',
      data: users,
    };
  }

  @ApiOperation({ summary: 'Get user by ID.' })
  @Get(':id')
  getUserById(@Param('id', MongoIdPipe) id: string) {
    const user = this.userService.findOneById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User found successfully',
      data: user,
    };
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
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created successfully',
      data: result,
    };
  }

  @ApiOperation({ summary: 'Update an existing user by ID.' })
  @Put(':id')
  updateUser(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateUserDto,
  ) {
    const updatedUser = this.userService.update(id, payload);
    return {
      statusCode: HttpStatus.OK,
      message: 'Client updated successfully',
      data: updatedUser,
    };
  }

  @ApiOperation({ summary: 'Remove a user by ID.' })
  @Delete(':id')
  deleteUser(@Param('id', MongoIdPipe) id: string) {
    const deletedUser = this.userService.delete(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}

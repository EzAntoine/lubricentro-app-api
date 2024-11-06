import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateVehicleDto, UpdateVehicleDto } from '../dtos/vehicle.dto';
import { VehicleService } from '../services/vehiculo.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Vehicles')
@UseGuards(JwtAuthGuard)
@Controller('vehicles')
export class VehiculoController {
  constructor(private vehicleService: VehicleService) {}

  @ApiOperation({ summary: 'Get all vehicles.' })
  @Get()
  async getAllVehicles() {
    try {
      const allVehicles = await this.vehicleService.findAll();
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Vehicles returned successfully.',
        data: allVehicles,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to return vehicles.',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Get vehicle by ID.' })
  @Get(':id')
  async getVehicleById(@Param('id') id: string) {
    try {
      const vehicle = await this.vehicleService.findOneById(id);

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Vehicle returned successfully.',
        data: vehicle,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to return vehicle.',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @ApiOperation({ summary: 'Get vehicle by plate.' })
  @Get('plate/:plate')
  async getVehicleByPlate(@Param('plate') plate: string) {
    try {
      const allVehicles = await this.vehicleService.findAll();
      const vehicle = allVehicles.find((elem) => elem.plate === plate);

      if (!vehicle) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Vehicle with plate ' + plate + ' not found.',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Vehicle returned successfully.',
        data: vehicle,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to return vehicle.',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Create new vehicle.' })
  @Post()
  async createVehicle(@Body() payload: CreateVehicleDto) {
    try {
      const newVehicle = await this.vehicleService.create(payload);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Vehicle created successfully.',
        data: newVehicle,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to create vehicle.',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Update an existing vehicle by ID.' })
  @Put(':id')
  updateVehicle(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateVehicleDto,
  ) {
    return this.vehicleService.update(id, payload);
  }

  @ApiOperation({ summary: 'Remove a vehicle by ID.' })
  @Delete(':id')
  deleteVehicle(@Param('id', MongoIdPipe) id: string) {
    return this.vehicleService.delete(id);
  }
}

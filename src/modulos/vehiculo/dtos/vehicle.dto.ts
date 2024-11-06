import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateVehicleDto {
  @ApiProperty({ description: 'Vehicle owner ID.' })
  @IsString()
  @IsNotEmpty()
  readonly ownerId: ObjectId;
  @ApiProperty({ description: 'Vehicle brand.' })
  @IsString()
  @IsNotEmpty()
  readonly brand: string;
  @ApiProperty({ description: 'Vehicle model.' })
  @IsString()
  @IsNotEmpty()
  readonly modelo: string;
  @ApiProperty({ description: 'Vehicle engine.' })
  @IsString()
  @IsNotEmpty()
  readonly engine: string;
  @ApiProperty({ description: 'Vehicle kilometers.' })
  @IsNumber()
  @IsNotEmpty()
  readonly kilometers: number;
  @ApiProperty({ description: 'Vehicle fabrication year.' })
  @IsOptional()
  @IsPositive()
  @Min(1900)
  @Max(2050)
  readonly year: number;
  @ApiProperty({ description: 'Vehicle plate.' })
  @IsString()
  @IsNotEmpty()
  readonly plate: string;
  @ApiProperty({ description: 'Vehicle details.' })
  @IsString()
  readonly details: string;
  @ApiProperty({ description: 'Vehicle order list.' })
  @IsArray()
  @IsNotEmpty()
  readonly orders: [];
}

export class UpdateVehicleDto extends PartialType(
  OmitType(CreateVehicleDto, []),
) {
  readonly ownerId?: string;
  readonly brand?: string;
  readonly modelo?: number;
  readonly engine?: string;
  readonly kilometers?: number;
  readonly year?: number;
  readonly plate?: string;
  readonly details?: string;
}

export class AddOrdersToVehicleDTO {
  @IsArray()
  @IsNotEmpty()
  readonly ordersIds: string[];
}

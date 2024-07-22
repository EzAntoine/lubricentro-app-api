import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateVehicleDto {
  @ApiProperty({ description: 'Vehicle owner ID.' })
  @IsString()
  @IsNotEmpty()
  readonly ownerId: string;
  @ApiProperty({ description: 'Vehicle brand.' })
  @IsString()
  @IsNotEmpty()
  readonly brand: string;
  @ApiProperty({ description: 'Vehicle model.' })
  @IsString()
  @IsNotEmpty()
  readonly modelo: string;
  @ApiProperty({ description: 'Vehicle fabrication year.' })
  @IsOptional()
  @IsPositive()
  @Min(1900)
  @Max(2050)
  readonly year: number;
  @ApiProperty({ description: 'Vehicle plate.' })
  @IsEmail()
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
  readonly year?: number;
  readonly plate?: string;
  readonly details?: string;
}

export class AddOrdersToVehicleDTO {
  @IsArray()
  @IsNotEmpty()
  readonly ordersIds: string[];
}

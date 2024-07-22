import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Order creation date.' })
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;
  @ApiProperty({ description: 'Client ID.' })
  @IsNotEmpty()
  @IsString()
  readonly clientId: string;
  @ApiProperty({ description: 'Vehicle plate.' })
  @IsNotEmpty()
  @IsString()
  readonly vehiclePlate: string;
  @ApiProperty({ description: 'Failure description.' })
  @IsNotEmpty()
  @IsString()
  readonly failure: string;
  @ApiProperty({ description: 'Estimated solution.' })
  @IsNotEmpty()
  @IsString()
  readonly estimateSolution: string;
  @ApiProperty({ description: 'Price.' })
  @IsNotEmpty()
  readonly price: number;
  @ApiProperty({ description: 'Order status.' })
  @IsNotEmpty()
  @IsString()
  readonly status: string;
  @ApiProperty({ description: 'Order observations.' })
  @IsString()
  readonly observations: string;
}

export class UpdateOrderDto extends PartialType(OmitType(CreateOrderDto, [])) {
  readonly date?: Date;
  readonly clientId?: string;
  readonly vehicleId?: string;
  readonly failure?: string;
  readonly estimateSolution?: string;
  readonly price?: number;
  readonly status?: string;
  readonly observations?: string;
}

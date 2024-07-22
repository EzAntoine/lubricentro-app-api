import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'Order creation date.' })
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;
  @ApiProperty({ description: 'Client ID.' })
  @IsNotEmpty()
  readonly clientId: string;
  @ApiProperty({ description: 'Vehicle ID.' })
  @IsNotEmpty()
  readonly vehicleId: string;
  @ApiProperty({ description: 'Failure description.' })
  @IsNotEmpty()
  readonly failure: string;
  @ApiProperty({ description: 'Estimated solution.' })
  @IsNotEmpty()
  readonly estimateSolution: string;
  @ApiProperty({ description: 'Price.' })
  @IsNotEmpty()
  readonly price: number;
  @ApiProperty({ description: 'Order status.' })
  @IsNotEmpty()
  readonly status: string;
  @ApiProperty({ description: 'Order observations.' })
  @IsNotEmpty()
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

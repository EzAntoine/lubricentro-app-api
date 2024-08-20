import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name.' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ description: 'Product description.' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @ApiProperty({ description: 'Product public price.' })
  @IsNotEmpty()
  @Min(0)
  readonly price: number;
  @ApiProperty({ description: 'Product cost.' })
  @IsNotEmpty()
  @Min(0)
  readonly cost: number;
  @ApiProperty({ description: 'Product stock.' })
  @IsNotEmpty()
  @Min(0)
  readonly stock: number;
  @ApiProperty({ description: 'Product category.' })
  @IsString()
  @IsNotEmpty()
  readonly category: string;
  @ApiProperty({ description: 'Product supplier.' })
  @IsString()
  @IsNotEmpty()
  readonly supplier: string;
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, []),
) {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly cost?: number;
  readonly stock?: number;
  readonly category?: string;
  readonly supplier?: string;
}

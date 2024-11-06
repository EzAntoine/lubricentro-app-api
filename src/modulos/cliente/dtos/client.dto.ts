import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ description: 'Client name.' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ description: 'Client surname.' })
  @IsString()
  @IsNotEmpty()
  readonly surname: string;
  @ApiProperty({ description: 'Client DNI.' })
  @IsString()
  @IsNotEmpty()
  readonly dni: string;
  @ApiProperty({ description: 'Client address.' })
  @IsString()
  @IsNotEmpty()
  readonly address: string;
  @ApiProperty({ description: 'Client phone number.' })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
  @ApiProperty({ description: 'Client email.' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty({ description: 'Client vehicles list.' })
  @IsArray()
  @IsNotEmpty()
  readonly vehicles: string[];
  @ApiProperty({ description: 'Client details.' })
  @IsString()
  readonly detail: string;
  @ApiProperty({ description: 'Order creator.' })
  @IsString()
  readonly createdBy: string;
}

export class UpdateClientDTO extends PartialType(
  OmitType(CreateClientDto, []),
) {
  readonly name?: string;
  readonly surname?: string;
  readonly dni?: number;
  readonly address?: string;
  readonly phone?: number;
  readonly email?: string;
  readonly detail?: string;
  readonly createdBy?: string;
}

export class AddVehiclesToClientDTO {
  @IsArray()
  @IsNotEmpty()
  readonly vehiclesIds: string[];
}

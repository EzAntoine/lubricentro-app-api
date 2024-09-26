import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { /*  IsArray, */ IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username.' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ description: 'Password.' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  /* @ApiProperty({ description: 'User orders.' })
  @IsArray()
  readonly orders: string[];

  @ApiProperty({ description: 'User role.' })
  @IsString()
  readonly role: string; */
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, [])) {
  readonly username?: string;
  readonly password?: string;
}

import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username.' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  //Se define aca? Ver luego con jwt.
  @ApiProperty({ description: 'Password.' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, [])) {
  readonly username?: string;
  readonly password?: string;
}

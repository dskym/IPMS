import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'user id',
    default: 'dskym',
    type: String,
  })
  @IsNotEmpty()
  readonly userId: string;
  @ApiProperty({
    description: 'password',
    default: '2134',
    type: String,
  })
  @IsNotEmpty()
  readonly password: string;
}

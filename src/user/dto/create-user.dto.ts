import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'user id',
    default: 'dskym',
    type: String,
  })
  @IsNotEmpty()
  readonly userId: string;
  @ApiProperty({
    description: 'name',
    default: 'seungyoon',
    type: String,
  })
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({
    description: 'email',
    default: 'test@naver.com',
    type: String,
  })
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    description: 'password',
    default: 'password',
    type: String,
  })
  @IsNotEmpty()
  readonly password: string;
}

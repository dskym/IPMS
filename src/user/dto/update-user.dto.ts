import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'name',
    default: 'seungyoon',
    type: String,
  })
  readonly name: string;
  @ApiProperty({
    description: 'email',
    default: 'test@naver.com',
    type: String,
  })
  readonly email: string;
  @ApiProperty({
    description: 'password',
    default: 'password',
    type: String,
  })
  readonly password: string;
}

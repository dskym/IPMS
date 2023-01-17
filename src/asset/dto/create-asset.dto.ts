import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAssetDto {
  @ApiProperty({
    description: 'asset name',
    default: 'bank',
    type: String,
  })
  @IsNotEmpty()
  name: string;
}

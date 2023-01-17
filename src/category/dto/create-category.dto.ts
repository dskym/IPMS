import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'category name',
    default: 'food',
    type: String,
  })
  @IsNotEmpty()
  name: string;
}

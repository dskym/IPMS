import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class UpdateBotDto {
  @ApiProperty({
    type: String,
    default: 'bot1',
    description: 'bot name',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Number,
    default: '1000',
    description: 'bot operation amount',
  })
  @Min(0)
  operationAmount: number;

  @ApiProperty({
    type: String,
    default: '1m',
    description: 'bot operation period',
  })
  @IsNotEmpty()
  period: string;

  @ApiProperty({
    type: Boolean,
    default: false,
    description: 'bot alarm setting',
  })
  isAlarm: boolean;

  @ApiProperty({
    type: Boolean,
    default: false,
    description: 'bot trade setting',
  })
  isTrade: boolean;
}

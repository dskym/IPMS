import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateHouseholdLedgerDto {
  @ApiProperty({
    description: 'trade type',
    default: 'buy',
    type: String,
  })
  @IsNotEmpty()
  tradeType: string;

  @ApiProperty({
    description: 'amount',
    default: 0,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({
    description: 'memo',
    default: 'chicken',
    type: String,
  })
  memo?: string;

  @ApiProperty({
    description: 'asset id',
    default: 0,
    type: Number,
  })
  @IsNumber()
  assetId: number;

  @ApiProperty({
    description: 'category id',
    default: 0,
    type: Number,
  })
  @IsNumber()
  categoryId: number;
}

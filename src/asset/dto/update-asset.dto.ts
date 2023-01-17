import { IsNotEmpty } from 'class-validator';

export class UpdateAssetDto {
  @IsNotEmpty()
  name: string;
}

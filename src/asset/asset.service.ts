import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetService {
  constructor(
    @InjectRepository(Asset)
    private assetRepository: Repository<Asset>,
  ) {}

  async create(user: User, createAssetDto: CreateAssetDto) {
    const asset = new Asset();
    asset.name = createAssetDto.name;
    asset.userId = user.id;

    return await this.assetRepository.save(asset);
  }

  async findAll(user: User) {
    return await this.assetRepository.findBy({ userId: user.id });
  }

  async findOne(user: User, id: number) {
    return await this.assetRepository.findOneBy({ userId: user.id, id });
  }

  async update(user: User, id: number, updateAssetDto: UpdateAssetDto) {
    const asset = await this.assetRepository.findOneBy({ userId: user.id, id });
    if (!asset) {
      throw new NotFoundException();
    }

    asset.name = updateAssetDto.name;

    return await this.assetRepository.save(asset);
  }

  async remove(user: User, id: number) {
    return await this.assetRepository.delete({ userId: user.id, id });
  }
}

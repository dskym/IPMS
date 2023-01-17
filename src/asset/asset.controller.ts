import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@ApiTags('수단 API')
@ApiBearerAuth('token')
@Controller('asset')
@UseGuards(JwtAuthGuard)
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  @ApiOperation({
    summary: 'create asset',
    description: 'Create Asset API',
  })
  async create(
    @CurrentUser() user: User,
    @Body() createAssetDto: CreateAssetDto,
  ) {
    return await this.assetService.create(user, createAssetDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get all assets',
    description: 'Get All Assets API',
  })
  async findAll(@CurrentUser() user: User) {
    return await this.assetService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get asset',
    description: 'Get Asset API',
  })
  async findOne(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.assetService.findOne(user, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update asset',
    description: 'Update Asset API',
  })
  async update(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    return await this.assetService.update(user, id, updateAssetDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete asset',
    description: 'Delete Asset API',
  })
  async remove(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.assetService.remove(user, id);
  }
}

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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('카테고리 API')
@ApiBearerAuth('token')
@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({
    summary: 'create category',
    description: 'Create Category API',
  })
  async create(
    @CurrentUser() user: User,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return await this.categoryService.create(user, createCategoryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'get category',
    description: 'Get Category API',
  })
  async findAll(@CurrentUser() user: User) {
    return await this.categoryService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get category',
    description: 'Get Category API',
  })
  async findOne(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.categoryService.findOne(user, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update category',
    description: 'Update Category API',
  })
  async update(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(user, id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete category',
    description: 'Delete Category API',
  })
  async remove(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.categoryService.remove(user, id);
  }
}

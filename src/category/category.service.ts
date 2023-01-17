import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(user: User, createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.userId = user.id;

    return await this.categoryRepository.save(category);
  }

  async findAll(user: User) {
    return await this.categoryRepository.findBy({ userId: user.id });
  }

  async findOne(user: User, id: number) {
    return await this.categoryRepository.findOneBy({ userId: user.id, id });
  }

  async update(user: User, id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({
      userId: user.id,
      id,
    });
    if (!category) {
      throw new NotFoundException();
    }

    category.name = updateCategoryDto.name;

    return await this.categoryRepository.save(category);
  }

  async remove(user: User, id: number) {
    return await this.categoryRepository.delete({ userId: user.id, id });
  }
}

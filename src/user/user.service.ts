import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = new User();
    user.userId = createUserDto.userId;
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.loginType = 'local';
    user.password = await bcrypt.hash(createUserDto.password, 4);

    return await this.userRepository.save(user);
  }

  async getUser(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async getUserByUserId(userId: string) {
    return await this.userRepository.findOneBy({ userId });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }

    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
    user.password = await bcrypt.hash(updateUserDto.password, 4);

    return await this.userRepository.save(user);
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete({ id });
  }
}

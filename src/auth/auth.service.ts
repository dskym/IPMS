import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserByLocalAuth(userId: string, password: string) {
    const user = await this.userService.getUserByUserId(userId);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException();
  }

  async validateUserByJwtAuth(userId: string, password: string) {
    const user = await this.userService.getUserByUserId(userId);

    if (user && (await bcrypt.compare(password, user.password))) {
      return await this.jwtService.sign({ id: user.id });
    }
    throw new UnauthorizedException();
  }
}

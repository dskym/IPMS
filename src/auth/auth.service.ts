import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

async validateUser(userId: string, password: string) {
    const user = await this.userService.getUserByUserId(userId);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUser2(userId: string, password: string) {
    const user = await this.userService.getUserByUserId(userId);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;

      const accessToken = await this.jwtService.sign(result);
      result['token'] = accessToken;

      return result;
    }
    return null;
  }
}

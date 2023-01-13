import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags('인증 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: 'login user',
    description: 'Login User API',
  })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.validateUser2(
      loginUserDto.userId,
      loginUserDto.password,
    );
  }

  @Delete('logout')
  @ApiOperation({
    summary: 'logout user',
    description: 'Logout User API',
  })
  async logoutUser() {
    return null;
  }
}

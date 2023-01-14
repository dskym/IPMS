import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@ApiTags('인증 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'login user',
    description: 'Login User API',
  })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.validateUserByJwtAuth(
      loginUserDto.userId,
      loginUserDto.password,
    );
  }

  @Delete('logout')
  @ApiBearerAuth('token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'logout user',
    description: 'Logout User API',
  })
  async logoutUser(@CurrentUser() user: User) {
    return user;
  }
}

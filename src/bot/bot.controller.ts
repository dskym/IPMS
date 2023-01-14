import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { BotService } from './bot.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';

@Controller('bot')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('token')
@ApiTags('봇 API')
export class BotController {
  constructor(private botService: BotService) {}

  @Put(':botId/start')
  @ApiOperation({
    summary: 'start bot',
    description: 'Start Bot API',
  })
  async startBot(
    @CurrentUser() user: User,
    @Param('botId', ParseIntPipe) botId: number,
  ) {
    return await this.botService.startBot(user, botId);
  }

  @Put(':botId/stop')
  @ApiOperation({
    summary: 'stop bot',
    description: 'Stop Bot API',
  })
  async stopBot(
    @CurrentUser() user: User,
    @Param('botId', ParseIntPipe) botId: number,
  ) {
    return await this.botService.stopBot(user, botId);
  }

  @Get()
  @ApiOperation({
    summary: 'get all bots',
    description: 'Get All Bots API',
  })
  async getAllBots(@CurrentUser() user: User) {
    return await this.botService.getAllBots(user);
  }

  @Get(':botId')
  @ApiOperation({
    summary: 'get bot',
    description: 'Get Bot API',
  })
  async getBot(
    @CurrentUser() user: User,
    @Param('botId', ParseIntPipe) botId: number,
  ) {
    return await this.botService.getBot(user, botId);
  }

  @Post()
  @ApiOperation({
    summary: 'create bot',
    description: 'Create Bot API',
  })
  async createBot(
    @CurrentUser() user: User,
    @Body() createBotDto: CreateBotDto,
  ) {
    return await this.botService.createBot(user, createBotDto);
  }

  @Put(':botId')
  @ApiOperation({
    summary: 'update bot',
    description: 'Update Bot API',
  })
  async updateBot(
    @CurrentUser() user: User,
    @Param('botId', ParseIntPipe) botId: number,
    @Body() updateBotDto: UpdateBotDto,
  ) {
    return await this.botService.updateBot(user, botId, updateBotDto);
  }

  @Delete(':botId')
  @ApiOperation({
    summary: 'delete bot',
    description: 'Delete Bot API',
  })
  async deleteBot(
    @CurrentUser() user: User,
    @Param('botId', ParseIntPipe) botId: number,
  ) {
    return await this.botService.deleteBot(user, botId);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SlackService } from 'nestjs-slack';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { Bot } from './entities/bot.entities';

@Injectable()
export class BotService {
  constructor(
    @InjectRepository(Bot)
    private botRepository: Repository<Bot>,
  ) {}

  async startBot(user: User, botId: number) {
    const bot = await this.botRepository.findOneBy({ user, id: botId });
    if (!bot) {
      throw new NotFoundException();
    }
    bot.status = 'start';
    await this.botRepository.save(bot);
  }

  async stopBot(user: User, botId: number) {
    const bot = await this.botRepository.findOneBy({ user, id: botId });
    if (!bot) {
      throw new NotFoundException();
    }
    bot.status = 'stop';
    await this.botRepository.save(bot);
  }

  async getAllBots(user: User) {
    return await this.botRepository.findBy({ user });
  }

  async getBot(user: User, botId: number) {
    return await this.botRepository.findOneBy({ user, id: botId });
  }

  async createBot(user: User, createBotDto: CreateBotDto) {
    const bot = new Bot();
    bot.name = createBotDto.name;
    bot.operationAmount = createBotDto.operationAmount;
    bot.period = createBotDto.period;
    bot.user = user;
    bot.status = 'stop';
    bot.isAlarm = createBotDto.isAlarm;
    bot.isTrade = createBotDto.isTrade;

    return await this.botRepository.save(bot);
  }

  async updateBot(user: User, botId: number, updateBotDto: UpdateBotDto) {
    const bot = await this.botRepository.findOneBy({ user, id: botId });
    if (!bot) {
      throw new NotFoundException();
    }

    bot.name = updateBotDto.name;
    bot.operationAmount = updateBotDto.operationAmount;
    bot.period = updateBotDto.period;
    bot.isAlarm = updateBotDto.isAlarm;
    bot.isTrade = updateBotDto.isTrade;

    return await this.botRepository.save(bot);
  }

  async deleteBot(user: User, botId: number) {
    return await this.botRepository.delete({ user, id: botId });
  }
}

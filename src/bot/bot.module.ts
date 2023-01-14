import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bot } from './entities/bot.entities';
import { AlarmModule } from 'src/alarm/alarm.module';

@Module({
  imports: [TypeOrmModule.forFeature([Bot]), AlarmModule],
  providers: [BotService],
  controllers: [BotController],
})
export class BotModule {}

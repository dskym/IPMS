import { Module } from '@nestjs/common';
import { SlackModule, SlackService } from 'nestjs-slack';

@Module({
  imports: [
    SlackModule.forRoot({
      type: 'api',
      token: 'xoxb-4656604420769-4637380043318-xjJlFtcn2fv9Pzh2ROdEFUNp',
      defaultChannel: 'C04JV0TKB0V',
    }),
  ],
  providers: [SlackService],
  exports: [SlackService],
})
export class AlarmModule {}

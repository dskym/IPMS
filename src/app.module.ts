import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { BotModule } from './bot/bot.module';
import { Bot } from './bot/entities/bot.entities';

const envConfig = {
  envFilePath: `.${process.env.NODE_ENV}.env`,
};

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ipms1234',
      database: 'ipms',
      entities: [User, Bot],
    }),
    ConfigModule.forRoot(envConfig),
    UserModule,
    AuthModule,
    BotModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

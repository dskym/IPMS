import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { BotModule } from './bot/bot.module';
import { Bot } from './bot/entities/bot.entities';
import { AlarmModule } from './alarm/alarm.module';
import { AssetModule } from './asset/asset.module';
import { CategoryModule } from './category/category.module';
import { HouseholdLedgerModule } from './household-ledger/household-ledger.module';
import { Category } from './category/entities/category.entity';
import { Asset } from './asset/entities/asset.entity';
import { HouseholdLedger } from './household-ledger/entities/household-ledger.entity';

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
      entities: [User, Bot, Category, Asset, HouseholdLedger],
    }),
    ConfigModule.forRoot(envConfig),
    UserModule,
    AuthModule,
    BotModule,
    AlarmModule,
    AssetModule,
    CategoryModule,
    HouseholdLedgerModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

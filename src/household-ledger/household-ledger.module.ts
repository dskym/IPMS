import { Module } from '@nestjs/common';
import { HouseholdLedgerService } from './household-ledger.service';
import { HouseholdLedgerController } from './household-ledger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseholdLedger } from './entities/household-ledger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HouseholdLedger])],
  controllers: [HouseholdLedgerController],
  providers: [HouseholdLedgerService],
})
export class HouseholdLedgerModule {}

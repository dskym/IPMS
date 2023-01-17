import { Test, TestingModule } from '@nestjs/testing';
import { HouseholdLedgerController } from './household-ledger.controller';
import { HouseholdLedgerService } from './household-ledger.service';

describe('HouseholdLedgerController', () => {
  let controller: HouseholdLedgerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseholdLedgerController],
      providers: [HouseholdLedgerService],
    }).compile();

    controller = module.get<HouseholdLedgerController>(HouseholdLedgerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

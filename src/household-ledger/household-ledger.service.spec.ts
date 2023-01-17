import { Test, TestingModule } from '@nestjs/testing';
import { HouseholdLedgerService } from './household-ledger.service';

describe('HouseholdLedgerService', () => {
  let service: HouseholdLedgerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HouseholdLedgerService],
    }).compile();

    service = module.get<HouseholdLedgerService>(HouseholdLedgerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

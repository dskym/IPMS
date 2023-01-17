import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateHouseholdLedgerDto } from './dto/create-household-ledger.dto';
import { UpdateHouseholdLedgerDto } from './dto/update-household-ledger.dto';
import { HouseholdLedger } from './entities/household-ledger.entity';

@Injectable()
export class HouseholdLedgerService {
  constructor(
    @InjectRepository(HouseholdLedger)
    private householdLedgerRepository: Repository<HouseholdLedger>,
  ) {}

  async create(user: User, createHouseholdLedgerDto: CreateHouseholdLedgerDto) {
    const householdLedger = new HouseholdLedger();
    householdLedger.amount = createHouseholdLedgerDto.amount;
    householdLedger.assetId = createHouseholdLedgerDto.assetId;
    householdLedger.categoryId = createHouseholdLedgerDto.categoryId;
    householdLedger.memo = createHouseholdLedgerDto.memo;
    householdLedger.tradeType = createHouseholdLedgerDto.tradeType;
    householdLedger.user = user;
    householdLedger.tradeDate = new Date();

    return await this.householdLedgerRepository.save(householdLedger);
  }

  async findAll(user: User) {
    return await this.householdLedgerRepository.findBy({ user });
  }

  async findOne(user: User, id: number) {
    return await this.householdLedgerRepository.findOneBy({ user, id });
  }

  async update(
    user: User,
    id: number,
    updateHouseholdLedgerDto: UpdateHouseholdLedgerDto,
  ) {
    const householdLedger = await this.householdLedgerRepository.findOneBy({
      user,
      id,
    });
    if (!householdLedger) {
      throw new NotFoundException();
    }

    householdLedger.amount = updateHouseholdLedgerDto.amount;
    householdLedger.assetId = updateHouseholdLedgerDto.assetId;
    householdLedger.categoryId = updateHouseholdLedgerDto.categoryId;
    householdLedger.memo = updateHouseholdLedgerDto.memo;
    householdLedger.tradeType = updateHouseholdLedgerDto.tradeType;
    householdLedger.user = user;
    householdLedger.tradeDate = new Date();

    return householdLedger;
  }

  async remove(user: User, id: number) {
    return await this.householdLedgerRepository.delete({ user, id });
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { HouseholdLedgerService } from './household-ledger.service';
import { CreateHouseholdLedgerDto } from './dto/create-household-ledger.dto';
import { UpdateHouseholdLedgerDto } from './dto/update-household-ledger.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorator/user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('가계부 API')
@ApiBearerAuth('token')
@Controller('household-ledger')
@UseGuards(JwtAuthGuard)
export class HouseholdLedgerController {
  constructor(
    private readonly householdLedgerService: HouseholdLedgerService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'create household',
    description: 'Create Household API',
  })
  async create(
    @CurrentUser() user: User,
    @Body() createHouseholdLedgerDto: CreateHouseholdLedgerDto,
  ) {
    return await this.householdLedgerService.create(
      user,
      createHouseholdLedgerDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'get all household',
    description: 'Get All Households API',
  })
  async findAll(@CurrentUser() user: User) {
    return await this.householdLedgerService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'get household',
    description: 'Get Household API',
  })
  async findOne(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.householdLedgerService.findOne(user, id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'update household',
    description: 'Update Household API',
  })
  async update(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHouseholdLedgerDto: UpdateHouseholdLedgerDto,
  ) {
    return await this.householdLedgerService.update(
      user,
      id,
      updateHouseholdLedgerDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'delete household',
    description: 'Delete Household API',
  })
  async remove(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.householdLedgerService.remove(user, id);
  }
}

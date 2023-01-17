import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class HouseholdLedger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'trade_type',
    type: 'varchar',
    nullable: false,
  })
  tradeType: string;

  @Column({
    name: 'trade_date',
    type: 'datetime',
    nullable: false,
  })
  tradeDate: Date;

  @Column({
    type: 'int',
    default: 0,
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  memo?: string;

  @Column({
    name: 'asset_id',
    type: 'int',
    default: 0,
    nullable: false,
  })
  assetId: number;

  @Column({
    name: 'category_id',
    type: 'int',
    default: 0,
    nullable: false,
  })
  categoryId: number;

  @ManyToOne(() => User, (user) => user.householdLedger, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

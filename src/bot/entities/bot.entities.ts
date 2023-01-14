import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'operation_amount',
    type: 'int',
    default: 0,
    nullable: false,
  })
  operationAmount: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  status: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  period: string;

  @Column({
    name: 'is_alarm',
    type: 'bool',
    default: false,
  })
  isAlarm: boolean;

  @Column({
    name: 'is_trade',
    type: 'bool',
    default: false,
  })
  isTrade: boolean;

  @ManyToOne(() => User, (user) => user.bots, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

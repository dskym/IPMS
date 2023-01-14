import { Bot } from 'src/bot/entities/bot.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LoginType } from '../type/login-type.type';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'user_id',
    unique: true,
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  userId: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  name: string;

  @Column({ nullable: false, type: 'varchar', length: 50 })
  email: string;

  @Column({ name: 'login_type', type: 'varchar', length: 20, nullable: false })
  loginType: LoginType;

  @Column({ type: 'varchar', length: 300, nullable: true })
  password: string;

  @OneToMany(() => Bot, (bot) => bot.user)
  bots: Bot[];
}

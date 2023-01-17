import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ name: 'user_id' })
  userId: number;

  @Column({
    type: String,
    length: 100,
    nullable: false,
  })
  name: string;
}

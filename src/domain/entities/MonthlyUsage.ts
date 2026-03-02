import {
  Entity, PrimaryGeneratedColumn, Column, Unique
} from "typeorm";

@Entity()
@Unique(["userId", "year", "month"])
export class MonthlyUsage {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  year: number;

  @Column()
  month: number;

  @Column({ default: 0 })
  freeUsed: number;
}
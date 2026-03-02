import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export enum Tier {
  BASIC = "BASIC",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE"
}

@Entity()
export class Bundle {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column({ type: "enum", enum: Tier })
  tier: Tier;

  @Column()
  remainingQuota: number; // -1 unlimited

  @CreateDateColumn()
  purchasedAt: Date;
}
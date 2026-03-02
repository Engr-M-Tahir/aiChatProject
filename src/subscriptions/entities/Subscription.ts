import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export enum SubscriptionTier {
  BASIC = "BASIC",
  PRO = "PRO",
  ENTERPRISE = "ENTERPRISE",
}

export enum BillingCycle {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  CANCELLED = "CANCELLED",
}

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column({
    type: "enum",
    enum: SubscriptionTier,
  })
  tier: SubscriptionTier;

  @Column({
    type: "enum",
    enum: BillingCycle,
  })
  billingCycle: BillingCycle;

  @Column()
  maxMessages: number;

  @Column("decimal")
  price: number;

  @Column()
  autoRenew: boolean;

  @Column({
    type: "enum",
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  status: SubscriptionStatus;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  renewalDate: Date;

  @CreateDateColumn()
  createdAt: Date;
}
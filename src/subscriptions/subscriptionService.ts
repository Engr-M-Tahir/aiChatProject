import { AppDataSource } from "../config/data-source";;
import {
  Subscription,
  SubscriptionTier,
  BillingCycle,
  SubscriptionStatus,
} from "./entities/Subscription";

export class SubscriptionService {

  async createSubscription(
    userId: string,
    tier: SubscriptionTier,
    billingCycle: BillingCycle,
    autoRenew: boolean
  ) {

    const repo = AppDataSource.getRepository(Subscription);

    const now = new Date();

    const endDate = new Date(now);

    if (billingCycle === BillingCycle.MONTHLY) {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const subscription = repo.create({
      userId,
      tier,
      billingCycle,
      maxMessages:
        tier === SubscriptionTier.BASIC
          ? 10
          : tier === SubscriptionTier.PRO
          ? 100
          : -1,
      price:
        tier === SubscriptionTier.BASIC
          ? 10
          : tier === SubscriptionTier.PRO
          ? 30
          : 100,
      autoRenew,
      status: SubscriptionStatus.ACTIVE,
      startDate: now,
      endDate,
      renewalDate: endDate,
    });

    return repo.save(subscription);
  }

  async cancelSubscription(userId: string, id: string) {
    const repo = AppDataSource.getRepository(Subscription);

    const sub = await repo.findOneBy({ id, userId });

    if (!sub) throw new Error("NOT_FOUND");

    sub.status = SubscriptionStatus.CANCELLED;
    sub.autoRenew = false;

    return repo.save(sub);
  }
}

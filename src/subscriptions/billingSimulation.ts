import { AppDataSource } from "../config/data-source";
import {
  Subscription,
  SubscriptionStatus,
  BillingCycle,
} from "./entities/Subscription";

/**
 * Runs periodically and simulates subscription renewals
 */
export const startBillingSimulation = () => {

  setInterval(async () => {
    const repo = AppDataSource.getRepository(Subscription);

    const now = new Date();

    const subscriptions = await repo.find({
      where: {
        status: SubscriptionStatus.ACTIVE,
        autoRenew: true,
      },
    });

    for (const sub of subscriptions) {

      if (sub.renewalDate <= now) {

        // simulate payment success/failure
        const paymentSuccess = Math.random() > 0.3; // 70% success

        if (!paymentSuccess) {
          sub.status = SubscriptionStatus.INACTIVE;
          await repo.save(sub);

          console.log(
            `Payment failed → subscription ${sub.id} marked inactive`
          );
          continue;
        }

        // extend subscription
        const newEndDate = new Date(sub.endDate);

        if (sub.billingCycle === BillingCycle.MONTHLY) {
          newEndDate.setMonth(newEndDate.getMonth() + 1);
        } else {
          newEndDate.setFullYear(newEndDate.getFullYear() + 1);
        }

        sub.startDate = sub.endDate;
        sub.endDate = newEndDate;
        sub.renewalDate = newEndDate;

        await repo.save(sub);

        console.log(`Subscription renewed: ${sub.id}`);
      }
    }
  }, 60 * 1000); // runs every 1 minute
};
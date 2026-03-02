import { EntityManager } from "typeorm";
import { MonthlyUsage } from "../entities/MonthlyUsage";
import { Bundle } from "../entities/Bundle";
import { QuotaExceededError } from "../errors/DomainErrors";

export class QuotaService {

  async deductQuota(userId: string, manager: EntityManager) {

    const now = new Date();

    let usage = await manager.findOne(MonthlyUsage, {
      where: {
        userId,
        year: now.getUTCFullYear(),
        month: now.getUTCMonth() + 1
      },
      lock: { mode: "pessimistic_write" }
    });

    if (!usage) {
      usage = manager.create(MonthlyUsage, {
        userId,
        year: now.getUTCFullYear(),
        month: now.getUTCMonth() + 1,
        freeUsed: 0
      });
      await manager.save(usage);
    }

    // FREE QUOTA
    if (usage.freeUsed < 3) {
      usage.freeUsed++;
      await manager.save(usage);
      return true;
    }

    // PAID BUNDLE
    const bundle = await manager.findOne(Bundle, {
      where: { userId },
      order: { purchasedAt: "DESC" },
      lock: { mode: "pessimistic_write" }
    });

    if (!bundle) throw new QuotaExceededError();

    if (bundle.remainingQuota !== -1) {
      if (bundle.remainingQuota <= 0)
        throw new QuotaExceededError();

      bundle.remainingQuota--;
      await manager.save(bundle);
    }

    return false;
  }
}
import { Request, Response } from "express";
import { SubscriptionService } from "./subscriptionService";
import {
  SubscriptionTier,
  BillingCycle,
} from "./entities/Subscription";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    roles?: string[];
  };
}

const service = new SubscriptionService();

export const createSubscription = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: "UNAUTHORIZED" });
    }

    const { tier, billingCycle, autoRenew } = req.body;

    const subscription = await service.createSubscription(
      req.user.id,
      tier as SubscriptionTier,
      billingCycle as BillingCycle,
      autoRenew
    );

    res.json(subscription);
  } catch {
    res.status(500).json({ code: "INTERNAL_ERROR" });
  }
};

export const cancelSubscription = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: "UNAUTHORIZED" });
    }

    const result = await service.cancelSubscription(
      req.user.id,
      req.params.id as string
    );

    res.json(result);
  } catch {
    res.status(404).json({ code: "NOT_FOUND" });
  }
};
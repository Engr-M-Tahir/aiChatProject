import { Router } from "express";
import {
  createSubscription,
  cancelSubscription,
} from "./subscriptionController";

import {
  auth0Middleware,
  attachUser,
} from "../infrastructure/security/auth0Middleware";

import { requestSecurity } from "../infrastructure/security/requestSecurity";

const router = Router();

router.post(
  "/subscriptions",
  auth0Middleware,
  attachUser,
  requestSecurity,
  createSubscription
);

router.delete(
  "/subscriptions/:id",
  auth0Middleware,
  attachUser,
  requestSecurity,
  cancelSubscription
);

export default router;
import { Router } from "express";
import { sendChat } from "../controllers/chatController";
import {
  auth0Middleware,
  attachUser,
} from "../../infrastructure/security/auth0Middleware";
import { requestSecurity } from "../../infrastructure/security/requestSecurity";
import { SendChatSchema } from "../../application/dtos/SendChat.dto";
import { validate } from "../middleware/validate.";

const router = Router();

router.post(
  "/chat",
  auth0Middleware,
  attachUser,
  requestSecurity,
  validate(SendChatSchema),
  sendChat
);

export default router;
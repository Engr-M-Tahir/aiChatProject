import { Router } from "express";
import { authMiddleware } from "../../infrastructure/security/authMiddleware";
import { sendChat } from "../controllers/chatController";

const router = Router();

router.post(
  "/chat",
  authMiddleware,
  sendChat
);

export default router;
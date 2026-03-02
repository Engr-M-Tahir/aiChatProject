import { Request, Response } from "express";
import { AppDataSource } from "../../config/data-source";
import { Chat } from "../../domain/entities/Chat";
import { Subscription } from "../../subscriptions/entities/Subscription";

export const getMetrics = async (
  _req: Request,
  res: Response
) => {
  const chatRepo = AppDataSource.getRepository(Chat);
  const subRepo = AppDataSource.getRepository(Subscription);

  const totalChats = await chatRepo.count();
  const totalSubscriptions = await subRepo.count();

  res.json({
    totalChats,
    totalSubscriptions,
  });
};
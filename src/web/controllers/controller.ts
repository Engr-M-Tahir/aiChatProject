import { Request, Response, NextFunction } from "express";
import { SendChatUseCase } from "../../application/use-cases/SendChatUseCase";

export const sendChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    // extra safety check (TypeScript + security)
    if (!req.user) {
      return res.status(401).json({
        code: "UNAUTHORIZED",
      });
    }

    if (!req.body.question) {
      return res.status(400).json({
        code: "INVALID_REQUEST",
      });
    }

    const useCase = new SendChatUseCase();

    const result = await useCase.execute(
      req.user.id,
      req.body.question,
      {
        timestamp: new Date(),
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      }
    );

    res.json(result);

  } catch (err: any) {

    if (err.code === "QUOTA_EXHAUSTED") {
      return res.status(402).json(err);
    }

    next(err); // send to global error handler
  }
};
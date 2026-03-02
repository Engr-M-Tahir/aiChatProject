import { SendChatUseCase } from "../../application/use-cases/SendChatUseCase";

export const sendChat = async (req, res, next) => {
  try {

    const useCase = new SendChatUseCase();

    const result = await useCase.execute(
      req.user.id,
      req.body.question,
      {
        timestamp: new Date(),
        ip: req.ip
      }
    );

    res.json(result);

  } catch (err) {
    next(err);
  }
};
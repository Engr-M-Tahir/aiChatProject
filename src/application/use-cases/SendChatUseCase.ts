import { AppDataSource } from "../../config/data-source";
import { Chat } from "../../domain/entities/Chat";
import { QuotaService } from "../../domain/services/QuotaService";

export class SendChatUseCase {

  async execute(userId: string, question: string, metadata: any) {

    return AppDataSource.transaction(async manager => {

      const quotaService = new QuotaService();

      const isFree =
        await quotaService.deductQuota(userId, manager);

      // simulate OpenAI
      await new Promise(r => setTimeout(r, 1500));

      const chat = manager.create(Chat, {
        userId,
        question,
        answer: `AI response to: ${question}`,
        tokens: 50,
        isFree,
        metadata
      });

      return manager.save(chat);
    });
  }
}
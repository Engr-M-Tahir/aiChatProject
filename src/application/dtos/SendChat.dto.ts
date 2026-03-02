import { z } from "zod";

export const SendChatSchema = z.object({
  question: z.string().min(3).max(2000)
});
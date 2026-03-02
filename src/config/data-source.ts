import "reflect-metadata";
import { DataSource } from "typeorm";
import { Chat } from "../domain/entities/Chat";
import { Bundle } from "../domain/entities/Bundle";
import { MonthlyUsage } from "../domain/entities/MonthlyUsage";
import { Subscription } from "../subscriptions/entities/Subscription";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "ai_chat",
  synchronize: true,
  logging: false,
  entities: [Chat, Bundle, MonthlyUsage, Subscription],
});
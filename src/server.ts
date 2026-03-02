import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import helmet from "helmet";
import cors from "cors";
import chatRoutes from "./web/routes/chatRoutes";
import { errorHandler } from "./web/middleware/errorHandler";
import { AppDataSource } from "./config/data-source";
import subscriptionRoutes from "./subscriptions/subscriptionRoutes";
import { startBillingSimulation } from "./subscriptions/billingSimulation";
import systemRoutes from "./web/routes/systemRoutes";
import metricsRoutes from "./web/routes/metricsRoutes";
const app = express();
app.use("/api", metricsRoutes);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", chatRoutes);
app.use("/api", subscriptionRoutes);
app.use("/api", systemRoutes);

app.use(errorHandler);

AppDataSource.initialize().then(() => {

  startBillingSimulation(); // ⭐ start renewal worker

  app.listen(3000, () =>
    console.log("Server running on port 3000")
  );
});
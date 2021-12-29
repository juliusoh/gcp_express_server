import express from "express";
import dotenv from "dotenv";
import logger from "./logger/logger";
import { connectDB } from "./database/db";
import scheduleTasks from "./cron-tasks";

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();

  app.listen(PORT, () => logger.info(`Server is running on PORT ${PORT}`));

  scheduleTasks();
})();

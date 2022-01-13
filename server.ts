import express from "express";
import dotenv from "dotenv";
import logger from "./logger/logger";
import { connectDB, CovidTestTrend } from "./database/db";
import scheduleTasks from "./cron-tasks";
import moment from 'moment'

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  const healthResponse: { uptime: number; message: string; timestamp: string } =
  {
    uptime: process.uptime(),
    message: "Status OK",
    timestamp: moment().format("LLLL"),
  };
try {
  res.status(200).send(healthResponse);
} catch (error: any) {
  healthResponse.message = error;
  res.status(503).send(healthResponse);
}
});

const $PORT = 8080;

app.listen($PORT, () => logger.info(`Server is running on PORT ${$PORT}`));
// (async () =>{
//   const existingRecord = await CovidTestTrend.findOne()
//   console.log(existingRecord)
// })()

scheduleTasks();

import cron from "node-cron";

import covidParser from "./covid-data/covidParser";
import logger from "./logger/logger";

function scheduleTasks() {
  cron.schedule("* 10 * * * *", covidParser);

  logger.info("Tasks scheduled");
}

export default scheduleTasks;

import cron from "node-cron";
import trendParser from './covid-data/trendParser';
import logger from "./logger/logger";
import covidVaccParser from "./covid-data/vaccParser";
import covidTestParser from "./covid-data/testParser";
import { getOwidTimeSeries } from "./big-query/owidTimeSeries";
import { getUSTimeSeries } from "./big-query/usTimeSeries";
import { whoCurrentData } from "./big-query/whoCurrent";
import { whoGlobalTimeSeries } from "./big-query/whoTimeSeries";
import { whoVaccTimeSeries } from "./big-query/whoVaccTimeSeries";

function scheduleTasks() {
  cron.schedule(
    "0 0 9 * * *",
    async () => {
      trendParser();
      covidVaccParser();
      covidTestParser();
      getOwidTimeSeries();
      getUSTimeSeries();
      whoCurrentData();
      whoGlobalTimeSeries();
      whoVaccTimeSeries();
    },
    null,
    true,
    "America/Los_Angeles"
  );

  logger.info("Tasks scheduled");
}

export default scheduleTasks;

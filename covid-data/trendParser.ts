import _ from "lodash";
import moment from "moment";
import { db } from "../database/db";
import logger from "../logger/logger";
import { CovidTrend } from "../database/db";
import { covidTrendsOverTime } from "./googleTrends";

async function covidTrendsParser() {
  const records = JSON.parse(await covidTrendsOverTime());

  records.default.timelineData.forEach(async (record) => {
    try {
      const { time, value } = record;
      const newTime = moment.unix(time).format("YYYY-MM-DD");

      // const existingRecord = await CovidTrend.findOne({
      //   where: {
      //     time: newTime,
      //   },
      // });
      const utc = moment().format();

      // if (existingRecord) {
      //   await existingRecord.update(record);
      // } else {
      await CovidTrend.destroy({ where: {} });
      await CovidTrend.create({
        time: newTime,
        popularityValue: value[0],
      });
      // }
      logger.info(`covid trends added at ${utc}`);
    } catch (error) {
      console.error(error);
    }
  });
}



export default covidTrendsParser;

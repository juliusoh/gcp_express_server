import _ from "lodash";
import moment from "moment";
import { CovidVaccTrend } from "../database/db";
import logger from "../logger/logger";
import { covidVaccOverTime } from "./googleTrends";

async function covidVaccParser() {
  const records = JSON.parse(await covidVaccOverTime());

  records.default.timelineData.forEach(async (record) => {
    try {
      const { time, value } = record;
      const newTime = moment.unix(time).format("YYYY-MM-DD");

      // const existingRecord = await CovidVaccTrend.findOne({
      //   where: {
      //     time: newTime,
      //   },
      // });
      const utc = moment().format();

      // if (existingRecord) {
      //   await existingRecord.update(record);
      // } else {
      await CovidVaccTrend.destroy({ where: {} });
      await CovidVaccTrend.create({
        time: newTime,
        popularityValue: value[0],
      });
      // }
      logger.info(`covid vacc added at ${utc}`);
    } catch (error) {
      console.error(error);
    }
  });
}


export default covidVaccParser;

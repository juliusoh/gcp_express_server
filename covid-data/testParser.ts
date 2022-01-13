import _ from "lodash";
import moment from "moment";
import { CovidTestTrend, CovidVaccTrend } from "../database/db";
import logger from "../logger/logger";
import { covidTestOverTime } from "./googleTrends";
import { fromUnixTime, parseISO } from "date-fns";
async function covidTestParser() {
  const records = JSON.parse(await covidTestOverTime());

  records.default.timelineData.forEach(async (record) => {
    try {
      const { time, value } = record;
      // const newTIme = fromUnixTime(time)
      // const date = parseISO("2020-01-05 00:00:00")
      const newTime = moment.unix(time).format();
      // const date = moment(newTime , moment.ISO_8601);
      // console.log(date, "JLSJAKLDJSLAKDAS")
      const utc = moment().format();
      const existingRecord = await CovidTestTrend.findOne({
        where: {
          time: newTime,
        },
      });
      // if (existingRecord) {
      //   await existingRecord.update(record);
      // } else {
      await CovidTestTrend.destroy({ where: {} });
      await CovidTestTrend.create({
        time: newTime,
        popularityValue: value[0],
      });
      // }
      logger.info(`covid test added at ${utc}`);
    } catch (error) {
      console.error(error);
    }
  });
}

export default covidTestParser;

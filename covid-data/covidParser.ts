import _ from "lodash";
import moment from "moment";
import getCovidData from "./getCovidData";
import { CurrentState } from "../database/db";
import logger from "../logger/logger";

async function covidParser() {
  //  table should be created once
  const records = await getCovidData();
  await Promise.all(
    records.map(async (record) => {
      try {
        const data = _.pick(record, [
          "fips",
          "country",
          "state",
          "level",
          "locationId",
          "population",
          "metrics",
          "riskLevels",
          "cdcTransmissionLevel",
          "actuals",
          "lastUpdatedDate",
        ]);

        // data.testPostivityRatio = _.get(record, "metrics.testPositivityRatio");
        // data.caseDensity = _.get(record, "metrics.caseDensity");
        // data.infectionRate = _.get(record, "metrics.infectionRate");
        // data.actualCases = 0;
        // try {
        //   data.actualCases = _.get(record, "actuals.cases");
        // } catch (error) {
        //   data.actualCases = 0;
        // }
        // if (data.actualCases == undefined || data.actualCases == null) {
        //   data.actualCases = 0;
        // }

        // data.actualdeaths = _.get(record, "actuals.deaths");
        const utc = moment().format();


        const existingState = await CurrentState.findOne({ where: { fips: data.fips } });
        if (existingState) {
          await existingState.update(data);
        } else {
          await CurrentState.create(data);
        }
        logger.info(`Records added at : ${utc}` )
      } catch (error) {
        console.error(error);
      }
    })
  );
}

export default covidParser;

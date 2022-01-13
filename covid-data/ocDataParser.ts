import _ from "lodash";
import moment from "moment";
import { getOCData } from "./getCovidData";
import { CurrentOrange, CurrentState } from "../database/db";
import logger from "../logger/logger";

async function ocCurrentParser() {
  //  table should be created once
  const records = await getOCData();

  try {
    const data = _.pick(records.data, [
      "fips",
      "country",
      "state",
      "county",
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

    const existingState = await CurrentOrange.findOne({ where: { fips: data.fips } });
    if (existingState) {
      await existingState.update(data);
    } else {
      await CurrentOrange.create(data);
    }
    logger.info(`Records added at : ${utc}`);
  } catch (error) {
    console.error(error);
  }
}
ocCurrentParser()
export default ocCurrentParser;

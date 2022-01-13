"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const getCovidData_1 = require("./getCovidData");
const db_1 = require("../database/db");
const logger_1 = __importDefault(require("../logger/logger"));
function usCovidParser() {
    return __awaiter(this, void 0, void 0, function* () {
        //  table should be created once
        const records = yield (0, getCovidData_1.getUSData)();
        yield Promise.all(records.map((record) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = lodash_1.default.pick(record, [
                    "date",
                    "country",
                    "fips",
                    "level",
                    "locationId",
                    "actuals",
                    "metrics",
                    "riskLevels",
                    "cdcTransmissionLevel",
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
                const utc = (0, moment_1.default)().format();
                // const existingState = await AmericaTimeSeries.findOne({ where: { fips: data.fips } });
                // if (existingState) {
                //   await existingState.update(data);
                // } else {
                yield db_1.AmericaTimeSeries.destroy({ where: {} });
                yield db_1.AmericaTimeSeries.create(data);
                // }
                logger_1.default.info(`Records added at : ${utc}`);
            }
            catch (error) {
                console.error(error);
            }
        })));
    });
}
exports.default = usCovidParser;

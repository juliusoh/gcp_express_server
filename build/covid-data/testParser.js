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
const moment_1 = __importDefault(require("moment"));
const db_1 = require("../database/db");
const logger_1 = __importDefault(require("../logger/logger"));
const googleTrends_1 = require("./googleTrends");
function covidTestParser() {
    return __awaiter(this, void 0, void 0, function* () {
        const records = JSON.parse(yield (0, googleTrends_1.covidTestOverTime)());
        records.default.timelineData.forEach((record) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { time, value } = record;
                // const newTIme = fromUnixTime(time)
                // const date = parseISO("2020-01-05 00:00:00")
                const newTime = moment_1.default.unix(time).format();
                // const date = moment(newTime , moment.ISO_8601);
                // console.log(date, "JLSJAKLDJSLAKDAS")
                const utc = (0, moment_1.default)().format();
                const existingRecord = yield db_1.CovidTestTrend.findOne({
                    where: {
                        time: newTime,
                    },
                });
                // if (existingRecord) {
                //   await existingRecord.update(record);
                // } else {
                yield db_1.CovidTestTrend.destroy({ where: {} });
                yield db_1.CovidTestTrend.create({
                    time: newTime,
                    popularityValue: value[0],
                });
                // }
                logger_1.default.info(`covid test added at ${utc}`);
            }
            catch (error) {
                console.error(error);
            }
        }));
    });
}
exports.default = covidTestParser;

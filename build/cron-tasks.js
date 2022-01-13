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
const node_cron_1 = __importDefault(require("node-cron"));
const trendParser_1 = __importDefault(require("./covid-data/trendParser"));
const logger_1 = __importDefault(require("./logger/logger"));
const vaccParser_1 = __importDefault(require("./covid-data/vaccParser"));
const testParser_1 = __importDefault(require("./covid-data/testParser"));
const owidTimeSeries_1 = require("./big-query/owidTimeSeries");
const usTimeSeries_1 = require("./big-query/usTimeSeries");
const whoCurrent_1 = require("./big-query/whoCurrent");
const whoTimeSeries_1 = require("./big-query/whoTimeSeries");
const whoVaccTimeSeries_1 = require("./big-query/whoVaccTimeSeries");
function scheduleTasks() {
    node_cron_1.default.schedule("0 0 9 * * *", () => __awaiter(this, void 0, void 0, function* () {
        (0, trendParser_1.default)();
        (0, vaccParser_1.default)();
        (0, testParser_1.default)();
        (0, owidTimeSeries_1.getOwidTimeSeries)();
        (0, usTimeSeries_1.getUSTimeSeries)();
        (0, whoCurrent_1.whoCurrentData)();
        (0, whoTimeSeries_1.whoGlobalTimeSeries)();
        (0, whoVaccTimeSeries_1.whoVaccTimeSeries)();
    }), null, true, "America/Los_Angeles");
    logger_1.default.info("Tasks scheduled");
}
exports.default = scheduleTasks;

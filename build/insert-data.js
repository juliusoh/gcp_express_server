"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trendParser_1 = __importDefault(require("./covid-data/trendParser"));
const covidParser_1 = __importDefault(require("./covid-data/covidParser"));
const vaccParser_1 = __importDefault(require("./covid-data/vaccParser"));
const usCovidParser_1 = __importDefault(require("./covid-data/usCovidParser"));
const ocDataParser_1 = __importDefault(require("./covid-data/ocDataParser"));
const testParser_1 = __importDefault(require("./covid-data/testParser"));
(0, covidParser_1.default)();
(0, trendParser_1.default)();
(0, vaccParser_1.default)();
(0, usCovidParser_1.default)();
(0, ocDataParser_1.default)();
(0, testParser_1.default)();

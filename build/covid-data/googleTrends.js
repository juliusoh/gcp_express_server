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
exports.covidTestOverTime = exports.covidVaccOverTime = exports.covidTrendsOverTime = void 0;
const google_trends_api_1 = __importDefault(require("google-trends-api"));
// COVID-19 SEARCHES OVER TIME?
function covidTrendsOverTime() {
    return __awaiter(this, void 0, void 0, function* () {
        let results;
        try {
            const response = yield google_trends_api_1.default.interestOverTime({ keyword: "Covid 19", startTime: new Date('2020-01-01') });
            results = response;
        }
        catch (error) {
            console.error(error);
        }
        return results;
    });
}
exports.covidTrendsOverTime = covidTrendsOverTime;
// COVID-19 VACCINATION SEARCH OVER TIME?
function covidVaccOverTime() {
    return __awaiter(this, void 0, void 0, function* () {
        let vaccs;
        try {
            const response = yield google_trends_api_1.default.interestOverTime({ keyword: "covid vaccine near me", startTime: new Date('2020-01-01') });
            vaccs = response;
        }
        catch (error) {
            console.error(error);
        }
        return vaccs;
    });
}
exports.covidVaccOverTime = covidVaccOverTime;
function covidTestOverTime() {
    return __awaiter(this, void 0, void 0, function* () {
        let tests;
        try {
            const response = yield google_trends_api_1.default.interestOverTime({ keyword: "covid test near me", startTime: new Date('2020-01-01') });
            tests = response;
        }
        catch (error) {
            console.error(error);
        }
        return tests;
    });
}
exports.covidTestOverTime = covidTestOverTime;

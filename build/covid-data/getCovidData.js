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
exports.getOCData = exports.getUSData = exports.getCurrentStatesData = void 0;
// Get Covid Data
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const request_1 = __importDefault(require("request"));
dotenv_1.default.config();
function getCurrentStatesData() {
    return __awaiter(this, void 0, void 0, function* () {
        let data;
        try {
            const response = yield axios_1.default.get(`https://api.covidactnow.org/v2/states.json?apiKey=${process.env.API_KEY}`);
            data = response.data;
        }
        catch (error) {
            console.error(error);
        }
        return data;
    });
}
exports.getCurrentStatesData = getCurrentStatesData;
function getUSData() {
    return __awaiter(this, void 0, void 0, function* () {
        let usData;
        try {
            const url = `https://api.covidactnow.org/v2/country/US.timeseries.csv?apiKey=${process.env.API_KEY}`;
            const response = yield (0, csvtojson_1.default)().fromStream(request_1.default.get(url));
            usData = response;
        }
        catch (error) {
            console.error(error);
        }
        return usData;
    });
}
exports.getUSData = getUSData;
function getOCData() {
    return __awaiter(this, void 0, void 0, function* () {
        let ocData;
        try {
            const url = `https://api.covidactnow.org/v2/county/06059.json?apiKey=${process.env.API_KEY}`;
            const response = axios_1.default.get(url);
            ocData = response;
        }
        catch (error) {
            console.error(error);
        }
        return ocData;
    });
}
exports.getOCData = getOCData;

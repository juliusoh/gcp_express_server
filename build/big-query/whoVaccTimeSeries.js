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
exports.whoVaccTimeSeries = void 0;
const bigquery_1 = require("@google-cloud/bigquery");
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const bigQueryCreds = require(path_1.default.resolve(path_1.default.join(__dirname, "../", "credentials", "credentials.json")));
const tempFolder = path_1.default.join(__dirname, ".temp");
function ensureDir(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.access(dir, fs_1.default.constants.W_OK);
        }
        catch (error) {
            yield promises_1.default.mkdir(dir);
        }
    });
}
const wait = (t = 1000) => new Promise((resolve) => setTimeout(resolve, t));
function createTempCSVFileWithContent(content) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ensureDir(tempFolder);
        const tempFile = path_1.default.join(tempFolder, "vaccTimeSeries" + Date.now() + ".csv");
        yield promises_1.default.writeFile(tempFile, content);
        return tempFile;
    });
}
function removeFile(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield promises_1.default.unlink(filename);
        }
        catch (e) { }
    });
}
function whoVaccTimeSeries() {
    return __awaiter(this, void 0, void 0, function* () {
        const bigQuery = new bigquery_1.BigQuery(bigQueryCreds);
        let fileName;
        try {
            const response = yield axios_1.default.get(`https://covid19.who.int/who-data/vaccination-data.csv`);
            fileName = yield createTempCSVFileWithContent(response.data);
            // const fileName = `https://api.covidactnow.org/v2/country/US.timeseries.csv?apiKey=${process.env.API_KEY}`
            const metaData = {
                sourceFormat: "CSV",
                skipLeadingRows: 1,
                autodetect: true,
                writeDisposition: "WRITE_TRUNCATE",
                location: "US",
            };
            const datasetId = "production";
            const tableId = "whoVaccTimeSeries";
            const [job] = yield bigQuery.dataset(datasetId).table(tableId).load(fileName, metaData);
            console.log(`Job ${job.id} completed.`);
        }
        finally {
            if (fileName) {
                // deepcode ignore PT: <it's not remote file, we delete temp file after processing>
                yield removeFile(fileName);
            }
        }
    });
}
exports.whoVaccTimeSeries = whoVaccTimeSeries;

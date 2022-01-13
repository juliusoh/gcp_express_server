"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger/logger"));
const db_1 = require("./database/db");
const cron_tasks_1 = __importDefault(require("./cron-tasks"));
const moment_1 = __importDefault(require("moment"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.connectDB)();
app.get("/", (req, res) => {
    const healthResponse = {
        uptime: process.uptime(),
        message: "Status OK",
        timestamp: (0, moment_1.default)().format("LLLL"),
    };
    try {
        res.status(200).send(healthResponse);
    }
    catch (error) {
        healthResponse.message = error;
        res.status(503).send(healthResponse);
    }
});
const $PORT = 8080;
app.listen($PORT, () => logger_1.default.info(`Server is running on PORT ${$PORT}`));
// (async () =>{
//   const existingRecord = await CovidTestTrend.findOne()
//   console.log(existingRecord)
// })()
(0, cron_tasks_1.default)();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const levels = {
    http: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60
};
// create a Pino logger
const logger = (0, pino_1.default)({
    // set the own levels
    customLevels: levels,
    // use only the custom levels
    useOnlyCustomLevels: true,
    // the minimum log level to be display
    level: "http"
});
// export the logger
exports.default = logger;

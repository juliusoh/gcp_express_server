"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sql = {
    database: 'mydb',
    username: 'root',
    password: process.env.SQL_PASSWORD,
    config: {
        host: '35.227.190.120',
        dialect: "mysql",
    },
};
exports.default = sql;

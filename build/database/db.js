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
exports.CovidTestTrend = exports.CurrentOrange = exports.AmericaTimeSeries = exports.CovidVaccTrend = exports.CovidTrend = exports.CurrentState = exports.dropTables = exports.dropTable = exports.syncTables = exports.disconnectDB = exports.connectDB = exports.db = void 0;
const sequelize_1 = require("sequelize");
const logger_1 = __importDefault(require("../logger/logger"));
const config_1 = __importDefault(require("../config"));
const db = new sequelize_1.Sequelize(config_1.default.database, config_1.default.username, config_1.default.password, config_1.default.config);
exports.db = db;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.authenticate();
        logger_1.default.info(`MySQL DB Connected: ${config_1.default.config.host}`);
    }
    catch (error) {
        logger_1.default.error(`Error: ${error} SQL CONFIG: ${(config_1.default.username, config_1.default.database, config_1.default.password)}`);
    }
});
exports.connectDB = connectDB;
const disconnectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.close();
        logger_1.default.info(`MySQL DB Disconnected: ${config_1.default.config.host}`);
    }
    catch (error) {
        logger_1.default.error(`Error: ${error}`);
    }
});
exports.disconnectDB = disconnectDB;
const syncTables = () => __awaiter(void 0, void 0, void 0, function* () {
    return db.sync({ force: true });
});
exports.syncTables = syncTables;
const dropTable = (tableName) => __awaiter(void 0, void 0, void 0, function* () {
    return db.query(`DROP TABLE ${tableName}`);
});
exports.dropTable = dropTable;
const dropTables = (tableNames) => __awaiter(void 0, void 0, void 0, function* () {
    return Promise.all(tableNames.map((tableName) => dropTable(tableName)));
});
exports.dropTables = dropTables;
const CurrentState = db.define("currentStates", {
    id: { autoIncrement: true, primaryKey: true, type: sequelize_1.DataTypes.INTEGER },
    fips: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    level: {
        type: sequelize_1.DataTypes.STRING,
    },
    locationId: {
        type: sequelize_1.DataTypes.STRING,
    },
    population: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    metrics: {
        type: sequelize_1.DataTypes.JSON,
    },
    riskLevels: {
        type: sequelize_1.DataTypes.JSON,
    },
    cdcTransmissionLevel: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    actuals: {
        type: sequelize_1.DataTypes.JSON,
    },
    lastUpdatedDate: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    timestamps: true,
});
exports.CurrentState = CurrentState;
const CurrentOrange = db.define("currentOrangeCounty", {
    id: { autoIncrement: true, primaryKey: true, type: sequelize_1.DataTypes.INTEGER },
    fips: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
    county: {
        type: sequelize_1.DataTypes.STRING,
    },
    level: {
        type: sequelize_1.DataTypes.STRING,
    },
    locationId: {
        type: sequelize_1.DataTypes.STRING,
    },
    population: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    metrics: {
        type: sequelize_1.DataTypes.JSON,
    },
    riskLevels: {
        type: sequelize_1.DataTypes.JSON,
    },
    cdcTransmissionLevel: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    actuals: {
        type: sequelize_1.DataTypes.JSON,
    },
    lastUpdatedDate: {
        type: sequelize_1.DataTypes.DATE,
    },
}, {
    timestamps: true,
});
exports.CurrentOrange = CurrentOrange;
const AmericaTimeSeries = db.define("timeSeriesUSA", {
    id: { autoIncrement: true, primaryKey: true, type: sequelize_1.DataTypes.INTEGER },
    date: {
        type: sequelize_1.DataTypes.DATE,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
    },
    fips: {
        type: sequelize_1.DataTypes.STRING,
    },
    level: {
        type: sequelize_1.DataTypes.STRING,
    },
    locationId: {
        type: sequelize_1.DataTypes.STRING,
    },
    actuals: {
        type: sequelize_1.DataTypes.JSON,
    },
    metrics: {
        type: sequelize_1.DataTypes.JSON,
    },
    riskLevels: {
        type: sequelize_1.DataTypes.JSON,
    },
    cdcTransmissionLevel: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    timestamps: true,
});
exports.AmericaTimeSeries = AmericaTimeSeries;
const CovidTrend = db.define("covidTrends", {
    id: { autoIncrement: true, primaryKey: true, type: sequelize_1.DataTypes.INTEGER },
    time: {
        type: sequelize_1.DataTypes.DATE,
    },
    popularityValue: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
});
exports.CovidTrend = CovidTrend;
const CovidVaccTrend = db.define("vaccTrends", {
    id: { autoIncrement: true, primaryKey: true, type: sequelize_1.DataTypes.INTEGER },
    time: {
        type: sequelize_1.DataTypes.DATE,
    },
    popularityValue: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
});
exports.CovidVaccTrend = CovidVaccTrend;
const CovidTestTrend = db.define("testTrends", {
    id: { autoIncrement: true, primaryKey: true, type: sequelize_1.DataTypes.INTEGER },
    time: {
        type: sequelize_1.DataTypes.DATE
    },
    popularityValue: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    timestamps: true,
});
exports.CovidTestTrend = CovidTestTrend;

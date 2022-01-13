import { Sequelize, DataTypes } from "sequelize";
import logger from "../logger/logger";
import sql from "../config";

const db = new Sequelize(sql.database, sql.username, sql.password, sql.config);

const connectDB = async () => {
  try {
    await db.authenticate();
    logger.info(`MySQL DB Connected: ${sql.config.host}`);
  } catch (error) {
    logger.error(`Error: ${error} SQL CONFIG: ${(sql.username, sql.database, sql.password)}`);
  }
};

const disconnectDB = async () => {
  try {
    await db.close();
    logger.info(`MySQL DB Disconnected: ${sql.config.host}`);
  } catch (error) {
    logger.error(`Error: ${error}`);
  }
};

const syncTables = async () => {
  return db.sync({ force: true });
};

const dropTable = async (tableName) => {
  return db.query(`DROP TABLE ${tableName}`);
};

const dropTables = async (tableNames) => {
  return Promise.all(tableNames.map((tableName) => dropTable(tableName)));
};

const CurrentState = db.define(
  "currentStates",
  {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    fips: {
      type: DataTypes.STRING,
      unique: true,
    },
    country: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
      unique: true,
    },
    level: {
      type: DataTypes.STRING,
    },
    locationId: {
      type: DataTypes.STRING,
    },
    population: {
      type: DataTypes.INTEGER,
    },
    metrics: {
      type: DataTypes.JSON,
    },
    riskLevels: {
      type: DataTypes.JSON,
    },
    cdcTransmissionLevel: {
      type: DataTypes.INTEGER,
    },
    actuals: {
      type: DataTypes.JSON,
    },
    lastUpdatedDate: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

const CurrentOrange = db.define(
  "currentOrangeCounty",
  {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    fips: {
      type: DataTypes.STRING,
      unique: true,
    },
    country: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    county: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.STRING,
    },
    locationId: {
      type: DataTypes.STRING,
    },
    population: {
      type: DataTypes.INTEGER,
    },
    metrics: {
      type: DataTypes.JSON,
    },
    riskLevels: {
      type: DataTypes.JSON,
    },
    cdcTransmissionLevel: {
      type: DataTypes.INTEGER,
    },
    actuals: {
      type: DataTypes.JSON,
    },
    lastUpdatedDate: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

const AmericaTimeSeries = db.define(
  "timeSeriesUSA",
  {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    date: {
      type: DataTypes.DATE,
    },
    country: {
      type: DataTypes.STRING,
    },
    fips: {
      type: DataTypes.STRING,
    },
    level: {
      type: DataTypes.STRING,
    },
    locationId: {
      type: DataTypes.STRING,
    },
    actuals: {
      type: DataTypes.JSON,
    },
    metrics: {
      type: DataTypes.JSON,
    },
    riskLevels: {
      type: DataTypes.JSON,
    },
    cdcTransmissionLevel: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);

const CovidTrend = db.define(
  "covidTrends",
  {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    time: {
      type: DataTypes.DATE,
    },
    popularityValue: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);
const CovidVaccTrend = db.define(
  "vaccTrends",
  {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    time: {
      type: DataTypes.DATE,
    },
    popularityValue: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

const CovidTestTrend = db.define(
  "testTrends",
  {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    time: {
      type: DataTypes.DATE
    },
    popularityValue: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

export {
  db,
  connectDB,
  disconnectDB,
  syncTables,
  dropTable,
  dropTables,
  CurrentState,
  CovidTrend,
  CovidVaccTrend,
  AmericaTimeSeries,
  CurrentOrange,
  CovidTestTrend
};

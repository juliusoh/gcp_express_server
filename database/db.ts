import { Sequelize, DataTypes } from "sequelize";
import logger from "../logger/logger";
import sql from "../config";

const db = new Sequelize(sql.database, sql.username, sql.password, sql.config);

const connectDB = async () => {
  try {
    await db.authenticate();
    logger.info(`MySQL DB Connected: ${sql.config.host}`);
  } catch (error) {
    logger.error(`Error: ${error}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await db.close();
    logger.info(`MySQL DB Disconnected: ${sql.config.host}`);
  } catch (error) {
    logger.error(`Error: ${error}`);
    process.exit(1);
  }
};

const syncTables = async () => {
  return db.sync({});
};

const dropTable = async (tableName) => {
  return db.query(`DROP TABLE ${tableName}`);
};

const dropTables = async (tableNames) => {
  return Promise.all(tableNames.map((tableName) => dropTable(tableName)));
};

const CurrentState = db.define("currentStates", {
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
});

export { db, connectDB, disconnectDB, syncTables, dropTable, dropTables, CurrentState };

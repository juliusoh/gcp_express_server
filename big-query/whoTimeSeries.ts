import { BigQuery } from "@google-cloud/bigquery";
import dotenv from "dotenv";
import axios from "axios";
import fsp from "fs/promises";
import fs from "fs";
import path from "path";

dotenv.config();

const bigQueryCreds = require(path.resolve(
  path.join(__dirname, "../", "credentials", "credentials.json")
));

const tempFolder = path.join(__dirname, ".temp");

async function ensureDir(dir) {
  try {
    await fsp.access(dir, fs.constants.W_OK);
  } catch (error) {
    await fsp.mkdir(dir);
  }
}

const wait = (t = 1000) => new Promise((resolve) => setTimeout(resolve, t));

async function createTempCSVFileWithContent(content) {
  await ensureDir(tempFolder);

  const tempFile = path.join(tempFolder, "GlobalTimeSeries" + Date.now() + ".csv");
  await fsp.writeFile(tempFile, content);
  return tempFile;
}

async function removeFile(filename) {
  try {
    await fsp.unlink(filename);
  } catch (e) {}
}

export async function whoGlobalTimeSeries() {
  const bigQuery = new BigQuery(bigQueryCreds);
  let fileName;

  try {
    const response = await axios.get(`https://covid19.who.int/WHO-COVID-19-global-data.csv`);
    fileName = await createTempCSVFileWithContent(response.data);

    // const fileName = `https://api.covidactnow.org/v2/country/US.timeseries.csv?apiKey=${process.env.API_KEY}`

    const metaData = {
      sourceFormat: "CSV",
      skipLeadingRows: 1,
      autodetect: true,
      writeDisposition: "WRITE_TRUNCATE",
      location: "US",
    };

    const datasetId = "production";
    const tableId = "whoGlobalTimeSeries";

    const [job] = await bigQuery.dataset(datasetId).table(tableId).load(fileName, metaData);
    console.log(`Job ${job.id} completed.`);
  } finally {
    if (fileName) {
      // deepcode ignore PT: <it's not remote file, we delete temp file after processing>
      await removeFile(fileName);
    }
  }
}


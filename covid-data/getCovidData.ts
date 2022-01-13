// Get Covid Data
import axios from "axios";
import dotenv from "dotenv";
import csv from "csvtojson";
import request from "request";

dotenv.config();
export async function getCurrentStatesData() {
  let data;
  try {
    const response = await axios.get(
      `https://api.covidactnow.org/v2/states.json?apiKey=${process.env.API_KEY}`
    );
    data = response.data;
  } catch (error) {
    console.error(error);
  }
  return data;
}

export async function getUSData() {
  let usData;
  try {
    const url = `https://api.covidactnow.org/v2/country/US.timeseries.csv?apiKey=${process.env.API_KEY}`;


    const response = await csv().fromStream(request.get(url));
    usData = response;
  } catch (error) {
    console.error(error);
  }
  return usData;
}

export async function getOCData() {
  let ocData;
  try {
    const url = `https://api.covidactnow.org/v2/county/06059.json?apiKey=${process.env.API_KEY}`

    const response = axios.get(url);
    ocData = response;
  } catch (error) {
    console.error(error)
  }
  return ocData;
}




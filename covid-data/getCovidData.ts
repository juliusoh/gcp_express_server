// Get Covid Data
import axios from "axios";

// cron job here
async function getCovidData() {
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

export default getCovidData;

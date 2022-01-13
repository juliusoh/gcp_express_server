import googleTrends from "google-trends-api";

// COVID-19 SEARCHES OVER TIME?
export async function covidTrendsOverTime() {
  let results;
  try {
    const response = await googleTrends.interestOverTime({ keyword: "Covid 19", startTime: new Date('2020-01-01')});
    results = response
  } catch (error) {
    console.error(error)
  }
  return results
}

// COVID-19 VACCINATION SEARCH OVER TIME?
export async function covidVaccOverTime() {
  let vaccs;
  try {
    const response = await googleTrends.interestOverTime({ keyword: "covid vaccine near me", startTime: new Date('2020-01-01')});
    vaccs = response
  } catch (error) {
    console.error(error)
  }

  return vaccs;
}

export async function covidTestOverTime() {
  let tests;
  try {
    const response = await googleTrends.interestOverTime({ keyword: "covid test near me", startTime: new Date('2020-01-01')});
    tests = response
  } catch (error) {
    console.error(error)
  }
  return tests;
}


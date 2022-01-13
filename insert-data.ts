import trendParser from './covid-data/trendParser';
import currentStatesParser from "./covid-data/covidParser";
import covidVaccParser from "./covid-data/vaccParser";
import usCovidParser from "./covid-data/usCovidParser";
import ocCurrentParser from "./covid-data/ocDataParser";
import covidTestParser from "./covid-data/testParser";

currentStatesParser();
trendParser()
covidVaccParser()
usCovidParser()
ocCurrentParser()
covidTestParser()
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import clear from "../../image/clear.png";
import cloud from "../../image/cloud.png";
import mist from "../../image/mist.png";
import drizzle from "../../image/drizzle.png";
import haze from "../../image/haze.png";
import rain from "../../image/rain.png";
import snow from "../../image/snow.png";
import { TYPES } from "../../redux/types";
import TodayForecast from "./TodayForecast";
import AirCondition from "./AirCondition";

export default function Mainpage() {
  const { search } = useSelector((state) => state.searchReducer);
  const [place, setPlace] = useState("");
  const [temp, setTemp] = useState("");
  const dispatch = useDispatch();

  const apiKey = "e8dcd859f320b42c0aff5f9ccd7b8dd6";
  const [weatherData, setWeatherData] = useState("");

  const getWeatherData = async () => {
    try {
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`
      );

      if (geoResponse.data.length > 0) {
        const { lat, lon } = geoResponse.data[0];
        dispatch({
          type: TYPES.GET_LOCATION_SUCCEED,
          lat: lat,
          lon: lon,
        });
        setPlace(geoResponse.data[0].name);
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        dispatch({
          type: TYPES.GET_WEATHER_SUCCEED,
          weather: weatherResponse.data,
        });
        setWeatherData(weatherResponse.data.weather[0].main);
        setTemp(weatherResponse.data.main.temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search !== "") {
      getWeatherData();
    }
  }, [search]);

  const imageWeather = () => {
    switch (weatherData) {
      case "Clear":
        return <img src={clear} alt={weatherData} />;

      case "Clouds":
        return <img src={cloud} alt={weatherData} />;

      case "Snow":
        return <img src={snow} alt={weatherData} />;

      case "Rain":
        return <img src={rain} alt={weatherData} />;

      case "Haze":
        return <img src={haze} alt={weatherData} />;

      case "Mist":
        return <img src={mist} alt={weatherData} />;

      case "Drizzle":
        return <img src={drizzle} alt={weatherData} />;

      default:
    }
  };
  return (
    <div className="mr-0 lg:mr-4 h-full flex flex-col items-center justify-evenly gap-4 text-sky-100">
      <div className="h-[30%] w-full">
        <div className="flex flex-col sm:flex-row text-center sm:text-left space-y-4 sm:space-y-0 items-center sm:items-stretch justify-between h-full min-w-min p-4">
          <div className="flex flex-col justify-between">
            <div className="max-w-2xl font-bold text-6xl">{place}</div>
            <div className="font-normal text-6xl">{Math.ceil(temp)} °C</div>
          </div>
          <div className="flex flex-col items-center justify-center w-1/4">
            <div className="flex flex-col items-center w-1/4">
              <div className="w-28 sm:w-44">{imageWeather()}</div>
              <div className="text-center font-light text-2xl">
                {weatherData}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full sm:h-1/3 bg-sky-800 rounded-3xl p-4 w-full">
        <TodayForecast />
      </div>
      <div className="h-1/3 bg-sky-800 rounded-3xl p-4 w-96 sm:w-[600px] lg:w-full">
        <AirCondition />
      </div>
    </div>
  );
}

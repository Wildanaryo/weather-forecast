import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import clear from "../../image/clear.png";
import cloud from "../../image/cloud.png";
import mist from "../../image/mist.png";
import drizzle from "../../image/drizzle.png";
import haze from "../../image/haze.png";
import rain from "../../image/rain.png";
import snow from "../../image/snow.png";
import { TYPES } from "../../redux/types";

export default function TodayForecast() {
  const [data, setData] = useState("");
  const { lat, lon } = useSelector((state) => state.locationReducer);
  const dispatch = useDispatch();

  const apiKey = "e8dcd859f320b42c0aff5f9ccd7b8dd6";
  const getForecast = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setData(res.data.list);
      dispatch({
        type: TYPES.GET_FORECAST_SUCCEED,
        forecast: res.data.list,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (lat) {
      getForecast();
    }
  }, [lat, lon]);

  function formatTime(param) {
    const time = param.split(" ")[1];
    const result = time.slice(0, 5);
    return result;
  }

  const imageWeather = (param) => {
    switch (param) {
      case "Clear":
        return <img src={clear} alt={param} />;

      case "Clouds":
        return <img src={cloud} alt={param} />;

      case "Snow":
        return <img src={snow} alt={param} />;

      case "Rain":
        return <img src={rain} alt={param} />;

      case "Haze":
        return <img src={haze} alt={param} />;

      case "Mist":
        return <img src={mist} alt={param} />;

      case "Drizzle":
        return <img src={drizzle} alt={param} />;

      default:
    }
  };

  return (
    <div className="p-2 h-full text-sky-100 flex flex-col justify-between">
      <div className="text-2xl font-bold">TODAY'S FORECAST</div>
      <div className="grid grid-cols-1 sm:grid-cols-5">
        {data
          ? data.map((item, index) => {
              if (index <= 4) {
                return (
                  <div
                    key={index}
                    className={`flex flex-row sm:flex-col justify-between sm:justify-center items-center space-y-0 sm:space-y-2 w-full ${
                      index > 0 ? "sm:border-l-2 border-t-2 sm:border-t-0" : ""
                    }`}
                  >
                    <div className="text-center text-xl">
                      {formatTime(item.dt_txt)}
                    </div>
                    <div className="flex justify-center">
                      <div className="w-24">
                        {imageWeather(item.weather[0].main)}
                      </div>
                    </div>
                    <div className="text-center text-xl">
                      {Math.ceil(item.main.temp)}°C
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })
          : null}
      </div>
    </div>
  );
}

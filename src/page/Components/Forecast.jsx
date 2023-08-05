import { useSelector } from "react-redux";
import clear from "../../image/clear.png";
import cloud from "../../image/cloud.png";
import mist from "../../image/mist.png";
import drizzle from "../../image/drizzle.png";
import haze from "../../image/haze.png";
import rain from "../../image/rain.png";
import snow from "../../image/snow.png";

export default function Forecast() {
  const { forecast } = useSelector((state) => state.forecastReducer);

  function dayForecast(params) {
    const splitDay = params.split(" ")[0];
    const [year, month, date] = splitDay.split("-");
    const dateObject = new Date(year, month - 1, date);
    const resultDay = String(dateObject).split(" ");
    const result = resultDay[0];
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
    <div className="bg-sky-800 h-full flex w-96 sm:w-[600px] lg:w-full flex-col space-y-2 p-6 rounded-3xl text-sky-100">
      <div className="text-2xl font-bold">5-DAY FORECAST</div>
      <div className="h-full grid">
        {forecast
          ? forecast.map((item, index) => {
              if (
                index === 0 ||
                index === 8 ||
                index === 16 ||
                index === 24 ||
                index === 32
              ) {
                return (
                  <div
                    key={index}
                    className={`p-2 space-y-2 w-full border-t-2 flex ${
                      index === 32 ? "border-b-2" : ""
                    } `}
                  >
                    <div className="grid grid-cols-1 w-full">
                      <div className="flex justify-between items-center">
                        {index === 0 ? (
                          <div>{"Today"}</div>
                        ) : (
                          <div>{dayForecast(item.dt_txt)}</div>
                        )}
                        <div className="flex gap-1 justify-center items-center">
                          <div className="w-24">
                            {imageWeather(item.weather[0].main)}
                          </div>
                          <div>{item.weather[0].main}</div>
                        </div>
                        <div>{Math.ceil(item.main.temp)} °C</div>
                      </div>
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

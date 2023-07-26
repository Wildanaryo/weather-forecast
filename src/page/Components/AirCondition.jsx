import { useSelector } from "react-redux";

export default function AirCondition() {
  const { weather } = useSelector((state) => state.forecastReducer);

  function formatText(params) {
    const text = params.split(" ");
    const result = text.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return result.join(" ");
  }

  return (
    <div className="p-2 h-full text-sky-100 flex flex-col space-y-2">
      <div className="text-2xl font-bold">AIR CONDITIONS</div>
      <div className="flex text-center h-full">
        {weather ? (
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col justify-center text-left text-xl">
              <div>
                <i className="bi bi-thermometer"></i> Feels Like
              </div>
              <div className="text-4xl">
                {Math.ceil(weather.main.feels_like)} °C
              </div>
            </div>
            <div className="flex flex-col justify-center text-left text-xl">
              <div>
                <i className="bi bi-droplet-fill"></i> Humidity
              </div>
              <div className="text-4xl">{weather.main.humidity} %</div>
            </div>
            <div className="flex flex-col justify-center text-left text-xl">
              <div>
                <i className="bi bi-wind"></i> Wind
              </div>
              <div className="text-4xl">{weather.wind.speed} m/s</div>
            </div>
            <div className="flex flex-col justify-center text-left text-xl">
              <div>
                <i className="bi bi-clouds-fill"></i> Weather Description
              </div>
              <div className="text-4xl">
                {formatText(weather.weather[0].description)}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

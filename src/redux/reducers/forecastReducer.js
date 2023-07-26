import { TYPES } from "../types";
const initState = {
  weather: "",
  forecast: "",
};
export const forecastReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.GET_WEATHER_SUCCEED:
      return {
        ...state,
        weather: action.weather,
      };
    case TYPES.GET_FORECAST_SUCCEED:
      return {
        ...state,
        forecast: action.forecast,
      };

    default:
      return state;
  }
};

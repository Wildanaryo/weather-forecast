import { TYPES } from "../types";
const initState = {
  lat: "",
  lon: "",
};
export const locationReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.GET_LOCATION_SUCCEED:
      return {
        ...state,
        lat: action.lat,
        lon: action.lon,
      };
    default:
      return state;
  }
};

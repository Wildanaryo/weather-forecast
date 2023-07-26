import { combineReducers } from "redux";
import { searchReducer } from "./searchReducer";
import { locationReducer } from "./locationReducer";
import { forecastReducer } from "./forecastReducer";

export const reducers = combineReducers({
  searchReducer,
  locationReducer,
  forecastReducer,
});

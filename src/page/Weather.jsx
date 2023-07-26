import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import Forecast from "./Components/Forecast";
import Mainpage from "./Components/Mainpage";
import { useDispatch } from "react-redux";
import { TYPES } from "../redux/types";

export default function Weather() {
  const dispatch = useDispatch();
  const [place, setPlace] = useState("");

  const handleInputPlace = (e) => {
    setPlace(e.target.value);
  };

  const handleClickSearch = () => {
    dispatch({
      type: TYPES.GET_SEARCH_SUCCEED,
      payload: place,
    });
    setPlace("");
  };

  return (
    <div className="h-full w-full max-w-7xl">
      <div className="flex justify-start lg:justify-end">
        <div className="h-14 w-full lg:w-1/3 flex focus:ring focus:ring-sky-700  ">
          <input
            type="text"
            value={place}
            placeholder="Search for cities"
            className="bg-sky-200 h-full w-full rounded-lg p-2 placeholder-text-sky-800 placeholder-text-2xl focus:outline-none focus:ring focus:ring-sky-700 text-2xl"
            onChange={handleInputPlace}
          />
          <button
            className="bg-sky-800 hover:bg-sky-400 hover:scale-105 px-4 h-full ml-2 rounded-lg text-sky-100 text-xl font-bold"
            onClick={handleClickSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center h-[95%]">
        <div className="w-96 sm:w-full lg:w-2/3 py-3 h-full min-w-min min-h-min">
          <Mainpage />
        </div>
        <div className="w-full lg:w-1/3 h-full py-3 justify-center flex">
          <Forecast />
        </div>
      </div>
    </div>
  );
}

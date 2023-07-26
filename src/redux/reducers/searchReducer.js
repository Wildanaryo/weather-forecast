import { TYPES } from "../types";

const initState = {
  search: "malang",
};

export const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case TYPES.GET_SEARCH_SUCCEED:
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};

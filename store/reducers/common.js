import * as actionTypes from "../actionTypes";

const initialState = {
  sort: "hot",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SORT:
      return action.sort ? { ...state, sort: action.sort } : { ...state };

    default:
      return state;
  }
};

export default reducer;

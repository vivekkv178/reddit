import * as actionTypes from "../actionTypes";

/**
 * The initial state of the common reducer is defined here and also changed as per requirement.
 */

const initialState = {
  sort: "hot",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SORT:
      /**
       * State is updated only when a sort value comes up, further we can add sort Type validation
       */
      return action.sort ? { ...state, sort: action.sort } : { ...state };

    default:
      return state;
  }
};

export default reducer;

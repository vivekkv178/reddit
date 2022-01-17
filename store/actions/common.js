import * as actionTypes from "../actionTypes";

/**
 * Change Sort
 */
export const changeSort = (sort) => {
  return {
    type: actionTypes.CHANGE_SORT,
    sort,
  };
};

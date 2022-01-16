import * as actionTypes from "../actionTypes";
// import * as firestoreUtils from "../../utils/firestoreUtils";
// import * as constants from "../../utils/constants";

/**
 * Change Sort
 * @param {*} Row
 */
export const changeSort = (sort) => {
  return {
    type: actionTypes.CHANGE_SORT,
    sort,
  };
  // return async (dispatch) => {
  //   // dispatch(changeSortStart());
  //   // firestoreUtils
  //   //   .updateCollectionDocument(constants.ROWS_COLLECTION, Row.documentId, {
  //   //     is_deleted: true,
  //   //   })
  //   //   .then(() => {
  //   //     dispatch(changeSortSuccess(Row));
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });
  // };
};

export const changeSortStart = () => ({
  type: actionTypes.DELETE_ROW_START,
});

export const changeSortSuccess = (Row) => ({
  type: actionTypes.DELETE_ROW_SUCCESS,
  Row: Row,
});

export const changeSortFail = (error) => ({
  type: actionTypes.DELETE_ROW_FAIL,
});

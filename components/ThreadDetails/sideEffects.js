import axios from "axios";

/**
 * All the API calls involved in the component are in the file and exported from here.
 * props and state are also passed as parameters to this function to change the state of the
 * component based on the API response.
 * @param {*} props - props of the component
 * @param {*} state - state of the component
 */

export const getThreadData = (props, state) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://www.reddit.com/${props.threadLink}.json`)
      .then((res) => {
        resolve(getThreadDataSuccessState(res, props, state));
      })
      .catch((e) => {
        resolve(getThreadDataErrorState(e, props, state));
      });
  });
};

/**
 *  Success state of the API is determined from the below function
 * @param {*} res
 * @param {*} props
 * @param {*} state
 */
const getThreadDataSuccessState = (res, props, state) => {
  // If something is wrong with the json a blank array is sent as data
  return {
    data: res?.data[0]?.data?.children[0]?.data || [],
    loading: false,
  };
};

/**
 *  Error state of the API is determined from the below function
 * @param {*} res
 * @param {*} props
 * @param {*} state
 */
const getThreadDataErrorState = (res, props, state) => {
  return {
    loading: false,
    error: true,
  };
};

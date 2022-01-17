import axios from "axios";

/**
 * All the API calls involved in the component are in the file and exported from here.
 * props and state are also passed as parameters to this function to change the state of the
 * component based on the API response.
 * @param {*} props - props of the component
 * @param {*} state - state of the component
 */
export const getSubRedditData = (props, state) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://www.reddit.com/r/dota2/${props.sort}/.json?after=${state.after}&raw_json=1&limit=10`
      )
      .then((res) => {
        resolve(getSubRedditDataSuccessState(res, props, state));
      })
      .catch((e) => {
        reject(getSubRedditDataErrorState(e, props, state));
      });
  });
};

/**
 *  Success state of the API is determined from the below function
 * @param {*} res
 * @param {*} props
 * @param {*} state
 */
const getSubRedditDataSuccessState = (res, props, state) => {
  let newData = [...state.data];
  newData = newData.concat(res.data.data.children);
  return {
    data: newData,
    after: `t3_${newData[newData.length - 1].data.id}`,
    loading: false,
  };
};

/**
 *  Error state of the API is determined from the below function
 * @param {*} res
 * @param {*} props
 * @param {*} state
 */
const getSubRedditDataErrorState = (res, props, state) => {
  return {
    loading: false,
    error: true,
  };
};

import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import { createStore, compose } from "redux";
import rootReducer from "../store/reducers/index";


const store = createStore(rootReducer);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

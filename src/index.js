import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { allReducers } from './redux/allReducers';
import { createStore } from 'redux';

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore(allReducers);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

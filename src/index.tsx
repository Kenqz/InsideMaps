import * as ReactDOMClient from "react-dom/client";
import React from "react";
import AppComponent from "./ts/components/app-component";
import { store } from "../src/redux/store";
import { Provider } from "react-redux";

const container = document.getElementById("app");
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <AppComponent />
  </Provider>
);

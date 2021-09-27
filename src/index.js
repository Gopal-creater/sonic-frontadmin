import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import themes from "./theme";
import { Provider } from 'react-redux';
import store from "./stores";
import "./assets/fonts/NunitoSans-Black.ttf"
import "./assets/fonts/NunitoSans-Bold.ttf"
import "./assets/fonts/NunitoSans-Regular.ttf"

const appTheme = createTheme(themes);
ReactDOM.render(
  <ThemeProvider theme={appTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

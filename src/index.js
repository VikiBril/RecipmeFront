import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StyledEngineProvider } from "@mui/material/styles";
import MiniDrawer from "./components/MiniDrawer";
//import AppRouter from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";



ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <App />
      <Router>
        <MiniDrawer>
          {/* <AppRouter /> */}
        </MiniDrawer>
      </Router>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

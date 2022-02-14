import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StyledEngineProvider } from "@mui/material/styles";
import MiniDrawer from "./Components/MiniDrawer";
import AppRouter from "./Routers/AppRouter";
import { BrowserRouter  } from "react-router-dom";
import "./index.css";


ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      {/* <App /> */}
      <BrowserRouter>
        <MiniDrawer>
          <AppRouter />
        </MiniDrawer>
      </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

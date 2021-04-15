import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { StrictMode } from "react";
import "font-awesome/css/font-awesome.min.css";
import { ContentProvider } from "./Context";

import App from "./App";
const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <Router>
      <ContentProvider>
        <App />
      </ContentProvider>
    </Router>
  </StrictMode>,
  rootElement
);

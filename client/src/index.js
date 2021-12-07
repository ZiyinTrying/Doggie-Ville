import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BusinessProvider } from "./components/BusinessContext";

ReactDOM.render(
  <BusinessProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BusinessProvider>,
  document.getElementById("root")
);

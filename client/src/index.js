import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BusinessProvider } from "./components/BusinessContext";
import { UserProvider } from "./components/UserContext";
import { FriendsProvider } from "./components/FriendsContext";

ReactDOM.render(
  <UserProvider>
    <BusinessProvider>
      <FriendsProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </FriendsProvider>
    </BusinessProvider>
  </UserProvider>,
  document.getElementById("root")
);

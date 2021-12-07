import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Map from "./components/Map";
import Header from "./components/Header";
import GlobalStyles from "./components/GlobalStyles";
import Homepage from "./components/HomePage";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <Router>
      <GlobalStyles />

      <Header />

      <Switch>
        <Route exact={true} path="/">
          <Homepage />
        </Route>
        <Route exact={true} path="/signup">
          SignUp
        </Route>

        <Route exact={true} path="/main">
          <MainPage />
        </Route>
        <Route exact={true} path="/:profileId">
          Profile
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

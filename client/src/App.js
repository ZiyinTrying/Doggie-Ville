import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Map from "./components/Map";
import Header from "./components/Header";
import GlobalStyles from "./components/GlobalStyles";
import Homepage from "./components/HomePage";
import MainPage from "./components/MainPage";
import BusinessDetail from "./components/BusinessDetail";
import NationalParkDetail from "./components/NationalParkDetail";
import SignUp from "./components/SignUp";
import ProfilePage from "./components/ProfilePage";
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
          <SignUp />
        </Route>

        <Route exact={true} path="/main">
          <MainPage />
        </Route>
        <Route exact={true} path="/main/:_id">
          <BusinessDetail />
        </Route>
        <Route exact={true} path="/nationalPark/:_id">
          <NationalParkDetail />
        </Route>
        <Route exact={true} path="/profile/:_id">
          <ProfilePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

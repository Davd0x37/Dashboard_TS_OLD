import React, { Component } from "react";
import "./App.scss";
import DigitalOcean from "./components/Plates/DigitalOcean";
import Spotify from "./components/Plates/Spotify";
import Paypal from "./components/Plates/Paypal";

class App extends Component {
  public render() {
    return (
      <div className="App">
        <Spotify />
        <DigitalOcean />
        <Paypal />
      </div>
    );
  }
}

export default App;

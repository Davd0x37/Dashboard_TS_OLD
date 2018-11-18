import React, { Component } from "react";
import { translate, WithNamespaces } from "react-i18next";
import "./App.scss";

import Spotify from "./components/Spotify/Spotify";
class App extends Component<WithNamespaces> {
  public render() {
    const { t } = this.props;
    return (
      <div className="App">
        <Spotify />
      </div>
    );
  }
}

export default translate()(App);

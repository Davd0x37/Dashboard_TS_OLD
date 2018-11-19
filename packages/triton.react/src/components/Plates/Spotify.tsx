import React, { Component } from "react";
import { WithNamespaces, withNamespaces } from "react-i18next";
import VLabel from "../Utils/VLabel";
import Plate from "./Plate";
import "./Spotify.scss";

class Spotify extends Component<WithNamespaces> {
  public state = {
    username: "test",
    email: "test",
    type: "test"
  };

  render() {
    const { t } = this.props;
    return (
      <Plate
        plateBrand="Spotify"
        plateClass="spotify-plate"
        plateBrandColor="#B5EB00"
      >
        <aside className="details">
          <VLabel title={t("Spotify.username")} value={this.state.username} />
          <VLabel
            title={t("Spotify.email")}
            value={this.state.email}
            noCapitalize={true}
          />
          <VLabel
            title={t("Spotify.type")}
            value={this.state.type}
            isLast={true}
            addClass="color"
          />
        </aside>
      </Plate>
    );
  }
}

export default withNamespaces("services")(Spotify);

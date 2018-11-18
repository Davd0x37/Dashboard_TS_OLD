import "./Spotify.scss";

import React, { Component } from "react";
import { translate, WithNamespaces } from "react-i18next";
import Plate from "../Plate/Plate";
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
          <p className="label__title">{t("username")}</p>
          <p className="label__value">{this.state.username}</p>
          <p className="label__title">{t("email")}</p>
          <p className="label__value label__no-capitalize">
            {this.state.email}
          </p>
          <p className="label__title">{t("type")}</p>
          <p className="label__value label__last spotify__title--color">
            {this.state.type}
          </p>
        </aside>
      </Plate>
    );
  }
}

export default translate("services.Spotify")(Spotify);

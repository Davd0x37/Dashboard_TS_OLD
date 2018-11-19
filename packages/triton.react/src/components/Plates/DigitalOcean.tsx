import React, { Component } from "react";
import { WithNamespaces, withNamespaces } from "react-i18next";
import VLabel from "../Utils/VLabel";
import "./DigitalOcean.scss";
import Plate from "./Plate";

class DigitalOcean extends Component<WithNamespaces> {
  public state = {
    email: "",
    lastCreatedDroplet: "",
    dropletlimit: "",
    total: ""
  };

  render() {
    const { t } = this.props;
    const { email, lastCreatedDroplet, dropletlimit, total } = this.state;
    return (
      <Plate
        plateBrand="DigitalOcean"
        plateClass="digital-ocean-plate"
        plateBrandColor="#0080FF"
      >
        <div className="details">
          <aside className="wrap">
            <VLabel
              title={t("DigitalOcean.email")}
              value={email}
              noCapitalize={true}
            />
            <VLabel
              title={t("DigitalOcean.lastCreatedDroplet")}
              value={
                lastCreatedDroplet +
                " " +
                (lastCreatedDroplet.length > 0
                  ? t("DigitalOcean.hoursAgo")
                  : "")
              }
              isLast={true}
              addClass="color"
            />
          </aside>

          <aside className="wrap">
            <VLabel
              title={t("DigitalOcean.dropletLimit")}
              value={dropletlimit}
              addClass="color"
            />
            <VLabel
              title={t("DigitalOcean.droplets")}
              value={total}
              isLast={true}
              addClass="color"
            />
          </aside>
        </div>
      </Plate>
    );
  }
}

export default withNamespaces("services")(DigitalOcean);

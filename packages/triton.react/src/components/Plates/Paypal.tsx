import React, { Component } from "react";
import { WithNamespaces, withNamespaces } from "react-i18next";
import VLabel from "../Utils/VLabel";
import Plate from "./Plate";
import "./Paypal.scss";

class Paypal extends Component<WithNamespaces> {
  public state = {
    username: "",
    email: "",
    phoneNumber: "",
    country: "",
    type: "",
    location: ""
  };

  render() {
    const { t } = this.props;
    return (
      <Plate
        plateBrand="Paypal"
        plateClass="paypal-plate"
        plateBrandColor="#0D96D9"
      >
        <aside className="details">
          <VLabel title={t("Paypal.username")} value={this.state.username} />
          <VLabel
            title={t("Paypal.email")}
            value={this.state.email}
            noCapitalize={true}
            addClass="color-blue"
          />
          <VLabel
            title={t("Paypal.phoneNumber")}
            value={this.state.phoneNumber}
            isLast={true}
            addClass="color-blue"
          />
        </aside>
        <aside className="details">
          <VLabel
            title={t("Paypal.country")}
            value={this.state.country}
            addClass="color-blue"
          />
          <VLabel
            title={t("Paypal.type")}
            value={
              this.state.type ? t("Paypal.verified") : t("Paypal.unverified")
            }
            addClass="color-card"
          />
          <VLabel
            title={t("Paypal.location")}
            value={this.state.location}
            isLast={true}
            addClass="color-blue"
          />
        </aside>
      </Plate>
    );
  }
}

export default withNamespaces("services")(Paypal);

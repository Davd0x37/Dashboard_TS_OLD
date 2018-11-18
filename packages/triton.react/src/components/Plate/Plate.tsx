import "./Plate.scss";


import React, { Component } from "react";

interface IPlateProps {
  plateBrand: string;
  plateClass: string;
  plateBrandColor: string;
}

class Plate extends Component<IPlateProps> {
  public state = {
    username: "",
    email: "",
    type: ""
  };

  render() {
    return (
      <article className="plate">
        <header className="plate__brand">
          <i
            className={`fab fa-${this.props.plateBrand.toLowerCase()} fa-2x`}
            style={{ color: this.props.plateBrandColor }}
          />
          <h3 className="plate__title">{this.props.plateBrand}</h3>
        </header>
        <div className={`plate__container ${this.props.plateClass}`}>
          {this.props.children}
        </div>
      </article>
    );
  }
}

export default Plate;

import React, { Component } from "react";
import "./VLabel.scss";

interface IVLabelProps {
  title: string;
  value: string;
  addClass?: string;
  isLast?: boolean;
  noCapitalize?: boolean;
}

class VLabel extends Component<IVLabelProps> {
  render() {
    const { isLast, noCapitalize, addClass, title, value } = this.props;
    return (
      <div>
        <p className="title">{title}</p>
        <p
          className={`value ${isLast ? "last" : ""} ${
            noCapitalize ? "no-capitalize" : ""
          } ${addClass ? addClass : ""}`}
        >
          {value}
        </p>
      </div>
    );
  }
}

export default VLabel;

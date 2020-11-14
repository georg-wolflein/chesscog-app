import React from "react";
import "./App.css";
import { IVersion, getVersion } from "../core/api";
import { version } from "process";

export default class Version extends React.Component<{}, IVersion> {
  componentDidMount() {
    getVersion().then((v) => this.setState(v));
  }
  render() {
    return (
      <span>
        {this.state
          ? `chesscog v${this.state.chesscog}, chesscog-api v${this.state.api}`
          : "loading..."}
      </span>
    );
  }
}

import React from "react";
import "./App.css";
import { API, IVersion } from "../core/api";
import { version } from "process";

export default class Version extends React.Component<{}, IVersion> {
  componentDidMount() {
    API.getVersion().then((v) => this.setState(v));
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

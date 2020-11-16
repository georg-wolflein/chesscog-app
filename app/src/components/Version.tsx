import React from "react";
import { API, IVersion } from "../core/api";

export default class Version extends React.Component<{}, IVersion> {
  componentDidMount() {
    API.getVersion().then((v) => this.setState(v));
  }
  render() {
    return (
      <span>
        {this.state ? (
          <span>
            {" "}
            chesscog v{this.state.chesscog}
            <br />
            chesscog-api v{this.state.api}
          </span>
        ) : (
          "loading..."
        )}
      </span>
    );
  }
}

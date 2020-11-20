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
            chesscog v{this.state.chesscog}
            <br />
            chesscog-api v{this.state.api}
            <br />
            chesscog-app{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://github.com/georgw777/chesscog-app/commit/${this.state.app}`}
            >
              @{this.state.app.substr(0, 7)}
            </a>
          </span>
        ) : (
          "loading..."
        )}
      </span>
    );
  }
}

import React from "react";
import { ReactComponent as GitHubCorner } from "../assets/github-corner.svg";
import "./GitHubRibbon.scss";

export default function GiHubRibbon() {
  return (
    <a
      href="https://github.com/georgw777/chesscog"
      aria-label="View source on GitHub"
      target="_blank"
    >
      <GitHubCorner className="GitHubRibbon-corner" />
    </a>
  );
}

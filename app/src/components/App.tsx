import React from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, Element } from "react-scroll";
import Recognition from "./Recognition";
import Version from "./Version";
import GitHubRibbon from "./GitHubRibbon";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GitHubRibbon />
        <h1>
          Recognise chess positions <br /> using computer vision
        </h1>
        <hr />
        <Container>
          <p>
            You played a chess game over the board and want to analyse it on the
            computer? Tired of dragging pieces around on your screen?
          </p>
          <p>
            You've come to the right place: <b>chesscog</b> does it for you.
            <br />
            It's <i>free</i> and fully automatic. All you need is a photo of the
            board.
          </p>
        </Container>
        <Link
          className="large-button App-learn-more"
          to="get-started"
          spy={true}
          smooth={true}
          duration={500}
        >
          Try it out
        </Link>
      </header>
      <Element name="get-started">
        <Recognition />
      </Element>
      <footer className="App-footer">
        <Container>
          <Row>
            <Col>
              created by{" "}
              <a href="https://github.com/georgw777">Georg Wölflein</a> in 2020
            </Col>
            <Col style={{ textAlign: "right" }}>
              <Version />
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;

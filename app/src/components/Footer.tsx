import React from "react";
import "./Footer.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Version from "./Version";

export default function Footer() {
  return (
    <footer className="Footer">
      <Container>
        <Row>
          <Col>
            created by <a href="https://georg.woelflein.eu">Georg Wölflein</a>{" "}
            in 2020
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Version />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

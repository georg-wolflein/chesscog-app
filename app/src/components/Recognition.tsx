import React from "react";
import "./Recognition.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { API, IPrediction } from "../core/api";
import FileUpload from "./FileUpload";

interface RecognitionProps {}
interface RecognitionState {
  prediction?: IPrediction;
}

class Recognition extends React.Component<RecognitionProps, RecognitionState> {
  constructor(props: RecognitionProps) {
    super(props);
    this.state = {};
  }

  performPrediction(file: File) {
    API.getPrediction(file).then((prediction) => this.setState({ prediction }));
  }

  render() {
    return (
      <section className="Recognition">
        <Container>
          <Row>
            <Col>
              <FileUpload onUpload={this.performPrediction.bind(this)} />
            </Col>
            <Col>
              {this.state.prediction && (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    this.state.prediction.svg
                  )}`}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Recognition;

import React from "react";
import "./Recognition.css";
import Container from "react-bootstrap/Container";
import Version from "./Version";
import { getPrediction, IPrediction } from "../core/api";
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
    getPrediction(file).then((prediction) => this.setState({ prediction }));
  }

  render() {
    return (
      <section className="Recognition">
        <Container>
          <FileUpload onUpload={this.performPrediction.bind(this)} />
          {this.state.prediction && (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                this.state.prediction.svg
              )}`}
            />
          )}
          <Version />
        </Container>
      </section>
    );
  }
}

export default Recognition;

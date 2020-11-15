import React from "react";
import "./Recognition.css";
import BounceLoader from "react-spinners/BounceLoader";
import Chessboard from "chessboardjsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { API, IPrediction } from "../core/api";
import FileUpload from "./FileUpload";

interface RecognitionProps {}
interface RecognitionState {
  prediction?: IPrediction;
  image?: File;
  loading: boolean;
}

class Recognition extends React.Component<RecognitionProps, RecognitionState> {
  private dummyRef = React.createRef<HTMLDivElement>();

  constructor(props: RecognitionProps) {
    super(props);
    this.state = { loading: false };
  }

  performPrediction(file: File) {
    this.setState((state) => ({ ...state, image: file, loading: true }));
    API.getPrediction(file).then((prediction) =>
      this.setState(() => ({ prediction, image: file, loading: false }))
    );
  }

  render() {
    return (
      <section className="Recognition">
        <Container>
          <Row>
            <Col>
              <div />
            </Col>
            <Col lg>
              <div ref={this.dummyRef} />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col lg className="Recognition-col">
              {this.state.image ? (
                <img
                  src={URL.createObjectURL(this.state.image)}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              ) : (
                <FileUpload onUpload={this.performPrediction.bind(this)} />
              )}
            </Col>
            <Col lg className="Recognition-col Recognition-board-container">
              <div className="Recognition-board">
                <Chessboard
                  calcWidth={() => this.dummyRef.current?.clientWidth || 100}
                  position={this.state.prediction?.fen}
                />
              </div>
              <div className="Recognition-loader">
                <BounceLoader
                  size={200}
                  color={"#ff8a00"}
                  loading={this.state.loading}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Recognition;

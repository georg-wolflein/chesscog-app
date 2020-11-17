import React from "react";
import "./Recognition.scss";
import BounceLoader from "react-spinners/BounceLoader";
import Chessboard from "chessboardjsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ButtonGroup, ToggleButton, Button } from "react-bootstrap";
import { API, IPrediction, Turn } from "../core/api";
import FileUpload from "./FileUpload";
import ImagePreview from "./ImagePreview";

interface RecognitionProps {}
interface RecognitionState {
  prediction?: IPrediction;
  image?: File;
  loading: boolean;
  componentWidth: number;
  turn: Turn;
  error?: string;
}

class Recognition extends React.Component<RecognitionProps, RecognitionState> {
  private dummyRef = React.createRef<HTMLDivElement>();

  constructor(props: RecognitionProps) {
    super(props);
    this.state = { loading: false, componentWidth: 100, turn: Turn.White };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState((state) => ({
      ...state,
      componentWidth: this.dummyRef.current?.clientWidth || 100,
    }));
  }

  performPrediction() {
    const file = this.state.image;
    if (!file) return;
    this.setState((state) => ({ ...state, loading: true }));
    API.getPrediction(file, this.state.turn)
      .then((prediction) =>
        this.setState((state) => ({
          ...state,
          prediction,
          image: file,
          loading: false,
        }))
      )
      .catch(() =>
        this.setState((state) => ({
          ...state,
          loading: false,
          error: "Error: failed to infer the chess position.",
        }))
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
                <div>
                  <Row>
                    <Col>
                      <ImagePreview
                        file={this.state.image}
                        corners={this.state.prediction?.corners}
                        width={this.state.componentWidth}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="Recognition-control">
                      <ButtonGroup toggle size="lg" className="btn-group-block">
                        <ToggleButton
                          key="white"
                          type="radio"
                          variant="secondary"
                          name="radio"
                          value="white"
                          checked={this.state.turn === Turn.White}
                          onChange={() =>
                            this.setState((state) => ({
                              ...state,
                              turn: Turn.White,
                            }))
                          }
                        >
                          White to play
                        </ToggleButton>
                        <ToggleButton
                          key="white"
                          type="radio"
                          variant="secondary"
                          name="radio"
                          value="white"
                          checked={this.state.turn === Turn.Black}
                          onChange={() =>
                            this.setState((state) => ({
                              ...state,
                              turn: Turn.Black,
                            }))
                          }
                        >
                          Black to play
                        </ToggleButton>
                      </ButtonGroup>
                    </Col>
                    <Col md={3} className="Recognition-control">
                      <Button
                        size="lg"
                        block
                        onClick={() =>
                          this.setState((state) => ({
                            ...state,
                            loading: false,
                            image: undefined,
                            prediction: undefined,
                            error: undefined,
                          }))
                        }
                        disabled={this.state.loading}
                      >
                        Reset
                      </Button>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <Col>
                      <button
                        className="large-button"
                        onClick={this.performPrediction.bind(this)}
                        style={{ width: "100%" }}
                      >
                        Go
                      </button>
                    </Col>
                    {this.state.prediction && (
                      <Col xs={3}>
                        <a
                          href={`https://lichess.org/editor/${this.state.prediction.fen}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="Recognition-lichess">
                            <span />
                          </div>
                        </a>
                      </Col>
                    )}
                  </Row>
                </div>
              ) : (
                <FileUpload
                  onUpload={(file) =>
                    this.setState((state) => ({ ...state, image: file }))
                  }
                />
              )}
            </Col>
            <Col lg className="Recognition-col">
              <div className="Recognition-board-container">
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
              </div>
              {this.state.error && (
                <p className="Recognition-error">{this.state.error}</p>
              )}
            </Col>
          </Row>
          <Row>
            <Col lg className="Recognition-col"></Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Recognition;

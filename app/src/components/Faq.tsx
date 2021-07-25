import React from "react";
import "./Faq.scss";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import GitHubRibbon from "./GitHubRibbon";

export default function Faq() {
  return (
    <div>
      <GitHubRibbon></GitHubRibbon>
      <Container className="Faq">
        <h1>Frequently asked questions</h1>
        <p>
          Here are some frequently asked questions. Go back to the main page
          using <Link to="/">this link</Link>.
        </p>
        <h4>Why did you create this?</h4>
        <p>
          I always found it to be quite tedious to transfer a chess position
          from a picture to the computer for analysis. I thought this process
          could be automated using computer vision and machine learning, and so
          I ended up making this the topic of my master thesis.
        </p>
        <h4>How does it work exactly?</h4>
        <p>
          Check out
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.mdpi.com/2313-433X/7/6/94"
          >
            this journal article
          </a>
          , which details the chess recognition pipeline from start to finish
          (or{" "}
          <a target="_blank" rel="noreferrer" href="">
            this blog post
          </a>{" "}
          for a more high-level overview). On the other hand, my{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/georg-wolflein/chesscog-report/raw/master/report.pdf"
          >
            master thesis
          </a>
          explains the process in much greater detail.
        </p>
        <p>
          The gist of it is that the board itself is localised using traditional
          computer vision techniques such as Canny edge detection and the Hough
          transform, and then two Convolutional Neural Networks (CNNs) classify
          the squares in order to produce a final prediction.
        </p>
        <h4>How should I capture the image of the chessboard?</h4>
        <p>
          Just use your smartphone to take a picture of the chessboard from the
          current player's perspective. The angle of the camera to the board
          should be between 45° and 60° for best results.
        </p>
        <h4>Why is it so slow?</h4>
        <p>
          The inference runs on a free server hosted on{" "}
          <a target="_blank" rel="noreferrer" href="https://www.heroku.com">
            Heroku
          </a>
          . It isn't equipped with a GPU and the CPU isn't that fast either, so
          inference takes around 10 seconds. Performance analysis in my master
          thesis showed that the speed on a good CPU was around two seconds, and
          with a GPU that went down to less than half a second.
        </p>
        <h4>How good is the system?</h4>
        <p>
          Empirical analysis in my master thesis concludes that the per-square
          accuracy is above 99% on the test set. However, since every chess set
          looks different, it is likely to perform much worse on your set, since
          it hasn't seen it before.
        </p>
        <p>
          Chapter 5 in my{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/georg-wolflein/chesscog-report/raw/master/report.pdf"
          >
            master thesis
          </a>{" "}
          develops an approach that fine-tunes the chess recognition system to a
          previously unseen chess set using only two pictures of the starting
          position. However, that involves training the neural networks which
          requires a GPU. Thus, I can't make that available as a service to
          everyone using the infrastructure in{" "}
          <a target="_blank" rel="noreferrer" href="https://www.heroku.com">
            Heroku
          </a>
          's free tier. Nevertheless, you could set up the chess recognition
          yourself and fine-tune it to your own chess set: the code is available{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/georg-wolflein/chesscog"
          >
            here
          </a>
          .
        </p>
      </Container>
    </div>
  );
}

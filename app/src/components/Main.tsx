import React from "react";
import "./Main.scss";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import Faq from "./Faq";

export default function Main() {
  return (
    <div className="Main">
      <Router>
        <div style={{ minHeight: "80vh" }}>
          <Switch>
            <Route path="/faq">
              <Faq />
            </Route>
            <Route path="/">
              <App />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

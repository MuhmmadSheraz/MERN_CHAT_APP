import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../Views/Home/Index.js";
import Chat from "../Views/Chat/Index.js";
export default function MainRouter() {
  return (
    <Router>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/chat/:name/:room">
        <Chat />
      </Route>
    </Router>
  );
}

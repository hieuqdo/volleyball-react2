import React from "react";
import { render } from "react-dom";
import ScoreTable from "./components/ScoreTable";
import MatchLine from "./components/MatchLine";
import Navbar from "./components/Navbar";
import { Table } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const styleTableCell = {
  padding: "15px",
  textAlign: "left"
};

const scoreDiv = {
  margin: "auto",
  width: "90%",
  maxWidth: "1000px",
  textAlign: "left"
};

const App = () => (
  <div>
    <Navbar />
    <ScoreTable />
  </div>
);

render(<App />, document.getElementById("root"));

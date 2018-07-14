import React from "react";
import { render } from "react-dom";
import {
  Button,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import MatchLine from "./MatchLine";
import Navbar from "./Navbar";
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

export default class ScoreTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={styles}>
        <br />
        <h2>Games</h2>
        <br />
        <div style={scoreDiv}>
          <Table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Home</th>
                <th />
                <th />
                <th>Away</th>
                <th />
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <MatchLine
                date="Apr 1, 2018"
                home="Dig Hero 6"
                away="Block Party"
                home_score="0"
                away_score="0"
                location="Cymer"
              />
              <MatchLine
                date="Jun 7, 2018"
                home="Dig Hero 6"
                away="Out of Bounds Exception"
                home_score="0"
                away_score="0"
                location="Northrop Grumman"
              />
              <MatchLine
                date="Oct 3, 2018"
                home="Block Party"
                away="Kathy"
                home_score="0"
                away_score="0"
                location="Teradata"
              />
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const rightAlign = {};

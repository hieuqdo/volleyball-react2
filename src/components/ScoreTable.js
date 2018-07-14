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
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import ModalMsg from "./ModalMsg";

const matches_url = "https://volleyballapi.herokuapp.com/matches";

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
    this.state = {
      data: [],
      modal: false
    };
  }

  componentDidMount() {
    axios
      .get(matches_url)
      .then(response => {
        const data = response.data.matches;
        this.setState(
          { data } //.sort((a, b) => a.date > b.date)
        );
      })
      .catch(error => {
        console.log("error");
        console.log(error);
      });
  }

  sortMatches = (a, b) => {
    let a_total = a.home_score + a.away_score;
    let b_total = b.home_score + b.away_score;

    if (a_total !== b_total) return a_total > b_total;
    return a.date > b.date;
  };

  toggleModal = (header, body, footer) => {
    if (this.state.modal) {
      this.setState({
        modal: false,
        error: false
      });
    } else {
      this.setState({
        modal: true,
        modalHeader: header,
        modalBody: body,
        modalFooter: footer
      });
    }
  };

  setError = () => {
    this.setState({
      error: true
    });
  };

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
                <th />
                <th>Away</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data
                .sort((a, b) => this.sortMatches(a, b))
                .map((item, index) => (
                  <MatchLine
                    onError={this.setError}
                    matches_url={matches_url}
                    key={index}
                    showModal={this.toggleModal}
                    {...item}
                  />
                ))}
            </tbody>
          </Table>
        </div>
        <ModalMsg
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          header={this.state.modalHeader}
          body={this.state.modalBody}
          footer={this.state.modalFooter}
          color={this.state.error ? "danger" : "success"}
        />
      </div>
    );
  }
}

import React from "react";
import axios from "axios";
import "./MatchLine.css";
import ScoreDropdown from "./ScoreDropdown";
import ModalMsg from "./ModalMsg";

const verticalAlign = {
  verticalAlign: "middle"
};

export default class MatchLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      home_score: props.home_score || 0,
      away_score: props.away_score || 0,
      vs_text: "vs",
      modal: false
    };
    this.saveScore = this.saveScore.bind(this);
  }

  color() {
    const home_score = this.state.home_score;
    const away_score = this.state.away_score;

    if (home_score === 0 && away_score === 0) {
      return "primary";
    }
    return "secondary";
  }

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

  changeHome(e) {
    let home_score = 0;
    let away_score = 0;

    if (e.currentTarget.value >= 0) {
      home_score = e.currentTarget.value;
      away_score = 3 - e.currentTarget.value;
    }
    this.saveScore(home_score, away_score);
  }

  changeAway(e) {
    let home_score = 0;
    let away_score = 0;

    if (e.currentTarget.value >= 0) {
      away_score = e.currentTarget.value;
      home_score = 3 - e.currentTarget.value;
    }
    this.saveScore(home_score, away_score);
  }

  showConfirmation = () => {};

  saveScore(home_score, away_score) {
    var match_id_url = `${this.state.matches_url}/${this.state.match_id}`;

    axios
      .patch(match_id_url, {
        match: {
          home_score: home_score,
          away_score: away_score
        }
      })
      .then(response => {
        this.setState({
          home_score: home_score,
          away_score: away_score
        });
        this.props.showModal("Save Successful", "Thanks!", "Have a nice day");
      })
      .catch(error => {
        console.log(error);
        this.props.onError();
        this.props.showModal("Save Failed", error, "Oops... Please try again");
      });
  }

  disableFuture() {
    return Date.parse(this.props.date) > Date.now();
  }

  render() {
    return (
      <tr>
        <td style={verticalAlign}>{this.props.date}</td>
        <td align="right" style={verticalAlign}>
          {this.props.home_team}
        </td>
        <td style={verticalAlign}>
          {this.disableFuture() ? (
            ""
          ) : (
            <ScoreDropdown
              onClick={this.changeHome.bind(this)}
              team_name={this.props.home_team}
              score={this.state.home_score}
              disabled={this.disableFuture.bind(this)()}
              color={this.color.bind(this)()}
            />
          )}
        </td>
        <td style={verticalAlign}>{this.state.vs_text}</td>
        <td style={verticalAlign}>
          {this.disableFuture() ? (
            ""
          ) : (
            <ScoreDropdown
              onClick={this.changeAway.bind(this)}
              team_name={this.props.away_team}
              score={this.state.away_score}
              disabled={this.disableFuture.bind(this)()}
              color={this.color.bind(this)()}
            />
          )}
        </td>
        <td style={verticalAlign}>{this.props.away_team}</td>
        <td style={verticalAlign}>{this.props.location}</td>
        <ModalMsg
          isOpen={this.state.modal}
          toggle={this.toggleModal}
          header={this.state.modalHeader}
          body={this.state.modalBody}
          footer={this.state.modalFooter}
          color={this.state.error ? "danger" : "success"}
        />
      </tr>
    );
  }
}

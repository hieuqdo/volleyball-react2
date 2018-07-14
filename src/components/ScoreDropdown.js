import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

export default class ScoreDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle disabled={this.props.disabled} color={this.props.color}>
          {this.props.score + ""}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>{this.props.team_name} Won:</DropdownItem>
          <DropdownItem value="0" onClick={this.props.onClick}>
            0
          </DropdownItem>
          <DropdownItem value="1" onClick={this.props.onClick}>
            1
          </DropdownItem>
          <DropdownItem value="2" onClick={this.props.onClick}>
            2
          </DropdownItem>
          <DropdownItem value="3" onClick={this.props.onClick}>
            3
          </DropdownItem>
          <DropdownItem value="-1" onClick={this.props.onClick}>
            Reset
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

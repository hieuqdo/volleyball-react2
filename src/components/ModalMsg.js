import React from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

export default class ModalMsg extends React.Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>{this.props.header}</ModalHeader>
        <ModalBody>{this.props.body}</ModalBody>
        <ModalFooter>
          <Button color={this.props.color} onClick={this.props.toggle}>
            {this.props.footer}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

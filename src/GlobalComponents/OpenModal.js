import React, {Component} from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
  } from 'reactstrap';

  class OpenModal extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            modal: false
        }
        this.toggleModalDialog = this.toggleModalDialog.bind(this);
    }

    toggleModalDialog() {
        this.setState({modal: !this.state.modal});
    }   

    render() {
        return (
            <div>               
                <Modal isOpen={this.state.modal}
                    toggle={() => this.toggleModalDialog()}
                    backdrop={true}
                    keyboard={true}
                    container={this.props.container}
                >
                    <ModalHeader>On Board</ModalHeader>
                    <ModalBody>
                        {this.props.data}
                    </ModalBody>
                    <ModalFooter>           
                        <Button color="secondary"
                                onClick={() => this.toggleModalDialog()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
  }
  export default OpenModal;
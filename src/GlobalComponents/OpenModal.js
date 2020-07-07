import React, {Component} from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
  } from 'reactstrap';

  class OpenModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
           openModal: false
        }
        this.toggleModalDialog = this.toggleModalDialog.bind(this);
    }

    toggleModalDialog() {
        this.setState({openModal: false});
    }

    componentWillReceiveProps(props) {
        this.setState({openModal: props.isOpenModal});
    }

    render() {        
        return (
            <div>               
                <Modal isOpen={this.state.openModal}
                    toggle={() => this.toggleModalDialog()}
                    backdrop={true}
                    keyboard={true}
                >
                    <ModalHeader className={this.props.alertClass}>{this.props.headerInfo}</ModalHeader>
                    <ModalBody>
                        {this.props.msg}
                    </ModalBody>
                    <ModalFooter>           
                        <Button className={this.props.alertClass}
                                onClick={() => this.toggleModalDialog()}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
  }
  export default OpenModal;
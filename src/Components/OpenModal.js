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
        this.props.closeModal(this.props.headerInfo);
    }

    componentWillReceiveProps(props) {
        this.setState({openModal: props.isOpenModal});
    }

    render() {   
        let class_name = 'mr-1 btn btn-info';  
        if(this.props.headerInfo==="Error"){
            class_name = 'mr-1 btn btn-danger';
        }else if(this.props.headerInfo==="Success"){
            class_name = 'mr-1 btn btn-success';
        }
        return (
            <div>               
                <Modal isOpen={this.state.openModal}
                    toggle={() => this.toggleModalDialog()}
                    backdrop={true}
                    keyboard={true}
                >
                    <ModalHeader className={class_name}>{this.props.headerInfo}</ModalHeader>
                    <ModalBody>
                        {this.props.msg}
                    </ModalBody>
                    <ModalFooter>           
                        <Button className={class_name}
                                onClick={() => this.toggleModalDialog()}>Ok</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
  }
  export default OpenModal;
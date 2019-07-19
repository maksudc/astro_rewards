import React from "react";
import {Modal, Button, Row} from "react-bootstrap";

class RedeemConfirmation extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      show: false
    }
    
    this.handleShow = this.handleShow.bind(this);
    this.proceedEvents = this.proceedEvents.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
      this.setState({show: false});
  }

  handleShow() {
      this.setState({show: true});
  }

  render(){

    return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Body>
                <div><b>Redeem this offer now?</b></div>
                <p className="mt-2">Do note that you will only have <strong>60 minutes</strong> to use the offer
                    once you proceed.</p>
                <Row> <Button className="offset-1 col-sm-5 col-md-5 col-xs-5 text-center" variant="secondary"
                              onClick={this.handleClose}>
                    Cancel
                </Button>
                    <Button onClick={this.proceedEvents}
                            className="offset-1   col-sm-4 col-md-4  col-xs-5 text-center"
                            style={{backgroundColor: '#e6007d', borderColor: '#e6007d'}}>
                        Proceed</Button>
                </Row>
                <Row className="mt-2 offset-2">
                    <p>Time Remaining : {this.state.time} minutes</p>
                </Row>
            </Modal.Body>
        </Modal>
      </>
    );
  }
};

export default RedeemConfirmation;

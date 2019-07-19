import React from "react";
import {Modal, Button, Row} from "react-bootstrap";
import "./assets/css/RewardDetails.css";
import VerificationOverlay from "./VerificationOverlay";

class RedeemOverlay extends React.Component{

  constructor(props, context){
    super(props, context);

    this.state = {
      isPromptShown: false
    };

    this.onPromptChosen = this.onPromptChosen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onPromptChosen(){

    this.setState({
      isPromptShown: true
    });
  }

  handleClose(){

    this.setState({
      isPromptShown: false
    });
  }

  render(){

    return (
      <>
         <Row className="pt-4 RedeemOverlayContainer">
             <div className="col-md-8 col-sm-8 col-xs-8 pt-2 ">
                <div className="row">
                  <div className="col-md-12">
                    <b>
                      This offer is valid for 60 minutes upon redemption
                    </b>
                  </div>
                </div>
              </div>
             <div className="col-md-4 col-sm-4 col-xs-4 pull-right">
                <Button className="btn btn-success" onClick={this.onPromptChosen}>
                  REDEEM
                </Button>
             </div>
         </Row>

         <Modal show={this.state.isPromptShown} onHide={this.handleClose}>
           <Modal.Body>
               <div><b>Redeem this offer now?</b></div>
               <p className="mt-2">Do note that you will only have <strong>60 minutes</strong> to use the offer
                   once you proceed.</p>
               <Row>
                 <Button className="offset-1 col-sm-5 col-md-5 col-xs-5 text-center" variant="secondary"
                             onClick={this.handleClose}>
                   Cancel
                 </Button>
                 <Button onClick={this.props.onConfirmation}
                           className="offset-1   col-sm-4 col-md-4  col-xs-5 text-center"
                           style={{backgroundColor: '#e6007d', borderColor: '#e6007d'}}>
                       Proceed
                 </Button>
               </Row>
           </Modal.Body>
         </Modal>
       </>
    );
  }
};

export default RedeemOverlay;

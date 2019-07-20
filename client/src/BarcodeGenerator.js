import React from "react";
import {Modal, Button, Row} from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';

var Barcode = require('react-barcode');
var QRCode =require('qrcode.react');

class BarcodeGenerator extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      active: this.props.active,
      copied: false
    };

    this.onCopy = this.onCopy.bind(this);
  }

  onCopy(){
    this.setState({copied: true});
  }

  render(){

    return(
      <div>
         <Modal show={this.state.active} onHide={this.props.onHide}>
            <Modal.Header closeButton onClick={this.props.onHide}/>
            <Modal.Body>
               <Row>
                  <div className="col-md-12">
                     <b>Your offer is Ready</b>
                  </div>
                  <div className="col-md-12">
                     <p className="mt-2">
                        { "Apply this code during the checkout process or click the SHOP NOW page below to have the code automatically applied for you" }
                     </p>
                  </div>
               </Row>
               <Row>
                  <div className="col-md-12 btn btn-light">
                     <p>
                        <QRCode  value={this.props.code}/>
                     </p>
                     <p>
                        <Barcode value={this.props.code} />
                     </p>
                  </div>
               </Row>
               <Row>
                  <div className="col-md-12"></div>
                  <div className="col-md-12">

                       <CopyToClipboard text={this.props.code}
                          onCopy={this.onCopy}>

                          <Button className="pull-left btn btn-light" variant="secondary"
                             onClick={this.onCopy}>
                          COPY CODE
                          </Button>

                       </CopyToClipboard>

                        <a onClick={this.props.onPurchase}
                        className="btn btn-danger pull-right"
                        style={{backgroundColor: '#e6007d', borderColor: '#e6007d'}}>
                          SHOP NOW
                        </a>
                    </div>
               </Row>
            </Modal.Body>
         </Modal>
      </div>
    );
  }
};

export default BarcodeGenerator;

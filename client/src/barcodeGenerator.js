import React from "react";
import {Modal, Button, Row} from "react-bootstrap";
var Barcode = require('react-barcode');
var QRCode =require('qrcode.react');

class barcodeGenerator extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      active: true,
      copied: false
    };

    this.onClose=this.onClose.bind(this);
    this.onCopy = this.onCopy.bind(this);
    this.onShopConfirmation = this.onShopConfirmation.bind(this);
  }

  onCopy(){
    this.setState({copied: true});
  }

  onClose(){
  this.setState({
    active:false
    })
  }


  onShopConfirmation(){

  }

  render(){

      return(
       <div>
         <Modal show={this.state.active} onHide={this.onClose}>
           <Modal.Header closeButton onclick={this.onClose}/>
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
                <p> <QRCode  value={this.props.match.params['itemcode']}/></p>
                <p>  <Barcode value={this.props.match.params['itemcode']} /> </p>

              </div>
            </Row>
            <Row>
              <div className="col-md-12"></div>
              <div className="col-md-12">


              </div>
            </Row>
           </Modal.Body>
      </Modal>
          <div className="col-md-6">
                  <Button onClick={this.state.active}
                            className="btn btn-danger pull-right"
                            style={{backgroundColor: '#e6007d', borderColor: '#e6007d'}}>
                        SHOP NOW
                  </Button>
                </div>
       </div>

    );
  }
};



export default barcodeGenerator;

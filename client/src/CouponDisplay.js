import React from "react";
import {Modal, Button, Row} from "react-bootstrap";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class CouponDisplay extends React.Component{

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

    return (
      <Modal show={this.state.active} onHide={this.props.onHide}>
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
                {this.props.code}
              </div>
            </Row>
            <Row>
              <div className="col-md-12"></div>
              <div className="col-md-12">
                <div className="col-md-6">
                  <CopyToClipboard text={this.props.code}
                    onCopy={this.onCopy}>

                    <Button className="pull-left btn btn-light" variant="secondary"
                                onClick={this.onCopy}>
                      COPY CODE
                    </Button>
                  </CopyToClipboard>
                </div>
                <div className="col-md-6">
                  <a onClick={this.props.onPurchase}
                            className="btn btn-danger pull-right"
                            style={{backgroundColor: '#e6007d', borderColor: '#e6007d'}}>
                        SHOP NOW
                  </a>
                </div>
              </div>
            </Row>
        </Modal.Body>
      </Modal>
    );
  }
};

export default CouponDisplay;

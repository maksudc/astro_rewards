import React from "react";
import { Row } from "react-bootstrap";
import "./assets/css/RewardDetails.css";

class RedeemedOverlay extends React.Component{

  constructor(props, context){
    super(props, context);
  }

  render(){

    return (
       <Row className="pt-4 RedeemOverlayContainer">
           <div className="col-md-8 col-sm-8 col-xs-8 pt-2 ">
              <div className="row">
                <div className="col-md-12">
                  <b>
                    { "You have Redeemed this" }
                  </b>
                </div>
              </div>
            </div>
           <div className="col-md-4 col-sm-4 col-xs-4 pull-right">
              <div className="btn btn-success disabled" disabled>REDEEMED</div>
           </div>
       </Row>
    );
  }
};

export default RedeemedOverlay;

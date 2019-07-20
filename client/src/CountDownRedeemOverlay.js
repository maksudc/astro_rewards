import React from "react";
import { Row } from "react-bootstrap";
import "./assets/css/RewardDetails.css";
import VerificationOverlay from "./VerificationOverlay";
import CouponDisplay from "./CouponDisplay";
import BarcodeGenerator from "./BarcodeGenerator";
import DatetimeUtils from "./utils/datetime";
import moment from "moment-timezone";
import { COMMON_ZONE, CLIENT_ZONE } from "./configs/timezone";
import { MAX_REDEEM_WAIT_TIME } from "./configs/common";

class CountDownRedeemOverlay extends React.Component{

  constructor(props, context){
    super(props, context);

    this.state = {
      endDate: moment(this.props.endDate, COMMON_ZONE).utc(),
      currentDate: moment().utc(),
      isCouponPromptActive: false
    };

    this.datetimeFormatter = new DatetimeUtils();

    this.timer = null;

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.showCode = this.showCode.bind(this);
    this.hideCode = this.hideCode.bind(this);

    this.startTimer();
  }

  startTimer() {

      this.timer = setInterval(() => {

        if(moment().utc() < this.state.endDate){
          this.setState({
            currentDate: moment().utc()
          });
        }else{
            this.stopTimer();
            this.props.onTimeout();
        }
      }, 1000);
  }

  stopTimer() {
      clearInterval(this.timer);
  }

  showCode(){

    this.setState({
      isCouponPromptActive: true
    });
  }

  hideCode(){

    this.setState({
      isCouponPromptActive: false
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
                    Time Left to Redeem
                  </b>
                </div>
                <div className="col-md-12">
                  <b>
                    { this.datetimeFormatter.formatDuration(this.state.currentDate.toDate(), this.state.endDate.toDate())}
                  </b>
                </div>
              </div>
            </div>
           <div className="col-md-4 col-sm-4 col-xs-4 pull-right">
              <button className="btn btn-success" onClick={this.showCode}>SHOW</button>
           </div>
       </Row>
       {
         this.state.isCouponPromptActive &&
         this.props.format == "online" &&
         <CouponDisplay
           active={true}
           code={this.props.code}
           website={this.props.website}
           onHide={this.hideCode}
           onPurchase={this.props.onPurchase}
           />
       }
       {
         this.state.isCouponPromptActive &&
         this.props.format == "store" &&
         <BarcodeGenerator
           active={true}
           code={this.props.code}
           website={this.props.website}
           onHide={this.hideCode}
           onPurchase={this.props.onPurchase}
           />
       }
      </>
    );
  }
};

export default CountDownRedeemOverlay;

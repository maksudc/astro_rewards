import React from "react";
import {Col, Image, Row} from "react-bootstrap";

import moment from "moment-timezone";
import {COMMON_ZONE, CLIENT_ZONE} from "./configs/timezone";
import {HEADERS} from "./configs/common";

import RedeemFormat from "./RedeemFormat";
import RedeemOverlay from "./RedeemOverlay";
import RedeemedOverlay from "./RedeemedOverlay";
import FullyRedeemedOverlay from "./FullyRedeemedOverlay";
import VerificationOverlay from "./VerificationOverlay";
import CountDownRedeemOverlay from "./CountDownRedeemOverlay";
import { RewardState } from "./RewardConstants";


class RewardDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            details: {},
            partner:{},
            description: [],
            status: RewardState.OPEN.value,
            show: false,
            subscriber: null,
            redeemInstance: null
        };

        this.rewardId = this.props.match.params['id'];

        this.changeStatus = this.changeStatus.bind(this);
        this.onRedeemTimeout = this.onRedeemTimeout.bind(this);
        this.onRedeemPromptConfirmation = this.onRedeemPromptConfirmation.bind(this);

        this.onVerificationCancelled = this.onVerificationCancelled.bind(this);
        this.onVerification = this.onVerification.bind(this);
        this.getRedeemInstanceForSubscriber = this.getRedeemInstanceForSubscriber.bind(this);
        this.createRedeemForSubscriber = this.createRedeemForSubscriber.bind(this);
        this.onPurchase = this.onPurchase.bind(this);
        this.applyCodeForSubscriber = this.applyCodeForSubscriber.bind(this);
    }

    changeStatus(STATUS){

      this.setState({
        status: STATUS.value
      });
    }

    onRedeemPromptConfirmation(){

      this.setState({
        status: RewardState.VERIFICATION.value
      });
    }

    onVerificationCancelled(){

      this.setState({
        status: RewardState.OPEN.value
      });
    }

    async onVerification(subscriber){

      this.setState({
        subscriber: subscriber
      });

      let redeemInstance = await this.getRedeemInstanceForSubscriber(subscriber);

      let generatedAt = moment.tz(redeemInstance.codeGeneratedAt, COMMON_ZONE).toDate();
      let expiredAt = moment.tz(redeemInstance.codeExpiredAt, COMMON_ZONE).toDate();

      redeemInstance.codeGeneratedAt = generatedAt;
      redeemInstance.codeExpiredAt = expiredAt;

      let currentDate = moment().utc().toDate();

      if(redeemInstance.applied){

        this.setState({
          status: RewardState.FULLY_REDEEMED.value
        });
      }
      else if(currentDate < expiredAt){

        this.setState({
          status: RewardState.RUNNING.value,
          redeemInstance: redeemInstance
        });
      }else{

        this.setState({
          status: RewardState.REDEEMED.value
        });
      }
    }

    async getRedeemInstanceForSubscriber(subscriber){

      let url = "/api/redeem/search?"
                + "SubscriberId=" + subscriber.id + "&"
                + "RewardId=" + this.rewardId;

      let response = await fetch(url);

      let redeemInstance = null;
      if(response.status == 200){
        redeemInstance = await response.json();
      }else if(response.status == 404){
        redeemInstance = await this.createRedeemForSubscriber(subscriber);
      }else{
        //@TODO: Create error page transition
      }

      return redeemInstance;
    }

    async createRedeemForSubscriber(subscriber){

      let url = "/api/redeem/create";
      let params = {
        redeem: {
          SubscriberId: subscriber.id,
          RewardId: this.rewardId
        }
      };

      let response = await fetch(url, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(params)
      });

      let redeemInstance = await response.json();

      return redeemInstance;
    }

    onRedeemTimeout(){

      this.setState({
        status: RewardState.REDEEMED.value
      });
    }

    async onPurchase(){

      let subscriber = this.state.subscriber;
      let applyCodeStatus = await this.applyCodeForSubscriber(subscriber);

      if(applyCodeStatus){

        this.setState({
          status: RewardState.FULLY_REDEEMED.value
        });
      }
    }

    async applyCodeForSubscriber(subscriber){

      let url = "/api/redeem/update";
      let params = {
        query:{
          SubscriberId: subscriber.id,
          RewardId: this.rewardId
        },
        data:{
          applied: true
        }
      };

      let response = await fetch(url, {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(params)
      });

      return response.status == 200;
    }

    render() {

        if(!this.state.show){
          return null;
        }

        let redeemOverlay = null;

        if(this.state.status == RewardState.VERIFICATION.value){
          //@TODO: Show Verification Page

          return (
            <VerificationOverlay
              onCancelled={this.onVerificationCancelled}
              onVerification={this.onVerification}
            />
          );

        }else if(this.state.status == RewardState.OPEN.value){

          redeemOverlay = <RedeemOverlay
            onConfirmation={this.onRedeemPromptConfirmation}
            />;

        }else if(this.state.status == RewardState.RUNNING.value){

          redeemOverlay = <CountDownRedeemOverlay
            startDate={this.state.redeemInstance.codeGeneratedAt}
            endDate={this.state.redeemInstance.codeExpiredAt}
            onTimeout={this.onRedeemTimeout}
            website={this.state.details.website}
            code={this.state.redeemInstance.code}
            onPurchase={this.onPurchase}
            />;

        }else if(this.state.status == RewardState.REDEEMED.value){

          redeemOverlay = <RedeemedOverlay />;

        }else if(this.state.status == RewardState.FULLY_REDEEMED.value){

          redeemOverlay = <FullyRedeemedOverlay />;
        }

        return (
            <div className="container">
                <Row>
                    <Col className="col-md-6 col-sm-12">
                      <div className="media">
                        <Image className="img" src={this.state.details.banner} height="180"/>
                      </div>
                    </Col>
                    <Col className="col-md-6 col-sm-12 mt-lg-0  mt-sm-4 pt-sm-4 pt-lg-0">
                        <div className="media">
                            <Image className="border border-secondary rounded-circle img img-circle  mr-3"
                                   src={ this.state.partner.logo }
                                   style={{width: 48, height: 48}}/>
                            <div className="media-body">
                                <h5 className="mt-0">
                                    { this.state.partner.name }
                                </h5>
                                <RedeemFormat format={this.state.details.format}/>
                            </div>
                        </div>
                        <h4>{this.state.details.title}</h4>
                        <p className="reward-subtitle">{this.state.details.subtitle}</p>
                        <Row>
                            <div className="col-sm-6">Redemption Period</div>
                            <div className="col-sm-6">{this.state.details.start_date} - {this.state.details.expiry_date}</div>
                        </Row>
                        <Row>
                            <div className="col-sm-6">Website</div>
                            <div className="col-sm-6"><a className="visitLink" href={this.state.details.website}>Visit Link</a>
                            </div>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-4 ml-0"> Descriptions:
                    <ul>
                        {
                          this.state.description.map((el, i) =>
                            <li key={i} className='description'>{el}</li>
                          )
                        }
                    </ul>
                </Row>
                {redeemOverlay}
            </div>
        );
    }

    componentDidMount() {

        let component = this;

        fetch("/api/rewards/" + this.props.match.params['id'])
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            component.setState({
                details: data,
                partner: data.partner,
                description: data.description,
                show: true
            });
        });
    }


}

export default RewardDetails;

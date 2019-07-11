import React from "react";
import {Card, Button} from "react-bootstrap";
import "./assets/css/RewardCard.css";

import RedeemFormat from "./RedeemFormat";

class RewardCard extends React.Component{

  render(){
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.banner} />
        <Card.Body>
          <div className="media">
            <img className="border border-secondary rounded-circle img img-circle  mr-3" src={this.props.partner.logo} style={{ width: 48, height: 48 }}/>
            <div classname="media-body">
              <h5 classname="mt-0">
                {this.props.partner.name}
              </h5>
              <RedeemFormat format={this.props.format}/>
            </div>
          </div>
        </Card.Body>
        <Card.Body style={{ "padding-top": "0px" }}>
          <Card.Title>{this.props.title}</Card.Title>
        </Card.Body>
      </Card>
    );
  }
};

export default RewardCard;

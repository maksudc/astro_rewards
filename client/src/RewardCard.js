import React from "react";
import {Card, Button} from "react-bootstrap";
import "./assets/css/RewardCard.css";

class RewardCard extends React.Component{

  render(){
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.banner} />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Text>
            {}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
};

export default RewardCard;

import React from "react";
import {Col, Row, Image} from "react-bootstrap";
import RedeemFormat from "./RedeemFormat";

import "./assets/css/RewardDetails.css";


class RewardDetailsView extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Container">
                <Row>
                    <Col className="col-md-6 col-sm-12"><Image src={this.props.banner} fluid/></Col>
                    <Col className="col-md-6 col-sm-12 mt-lg-0  mt-sm-4 pt-sm-4 pt-lg-0">
                        <div className="media">
                            <Image className="border border-secondary rounded-circle img img-circle  mr-3"
                                   style={{width: 48, height: 48}}/>
                            <div className="media-body">
                                <h5 className="mt-0">
                                    {this.props.partner.name}
                                </h5>
                                <RedeemFormat format={this.props.format}/>
                            </div>
                        </div>
                        <p><h4>{this.props.title}</h4></p>
                        <p className="reward-subtitle">{this.props.subtitle}</p>
                        <Row>
                            <div className="col-sm-6">Redemption Period</div>
                            <div className="col-sm-6">{this.props.start_date} - {this.props.expiry_date}</div>
                        </Row>
                        <Row>
                            <div className="col-sm-6">Website</div>
                            <div className="col-sm-6"><a className="visitLink" href={this.props.website}>Visit Link</a>
                            </div>
                        </Row>

                    </Col>

                </Row>
                <Row className="mt-4 ml-0"> Descriptions:
                    <ul>
                        {this.props.description.map((el, i) =>
                            <li className='description'>{el}</li>
                        )}
                    </ul>
                </Row>

            </div>

        );
    }

};

export default RewardDetailsView;

import React from "react";
import {Modal, Button, Row} from "react-bootstrap";
import {NUM_CONVERSION_BASE, HEADERS} from "./configs/common";
import {MIN_ACCOUNT_IDENTIFIER_LENGTH, MAX_ACCOUNT_IDENTIFIER_LENGTH} from "./SubscriberConstants";
import { VerificationType } from "./RewardConstants";
import sampleImg from "./assets/img/sample.png";

class VerificationOverlay extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            questionOverlay: false,
            sampleOverlay: false,

            verificationType: VerificationType.MYKAD.value,
            verificationNumber: null,

            accountIdentifierNumber: null,
            rememberAccount: null,

            isVerificationError: false
        }

        this.handleQuestionOverlayOpen = this.handleQuestionOverlayOpen.bind(this);
        this.handleQuestionOverlayClose = this.handleQuestionOverlayClose.bind(this);
        this.handleSampleOverlayOpen = this.handleSampleOverlayOpen.bind(this);
        this.handleSampleOverlayClose = this.handleSampleOverlayClose.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onVerificationError = this.onVerificationError.bind(this);
        this.validateParams = this.validateParams.bind(this);
        this.verify = this.verify.bind(this);
    }

    handleQuestionOverlayOpen() {
        this.setState({questionOverlay: true})
    }

    handleQuestionOverlayClose() {
        this.setState({questionOverlay: false})
    }

    handleSampleOverlayOpen() {
        this.setState({sampleOverlay: true})
    }

    handleSampleOverlayClose() {
        this.setState({sampleOverlay: false})
    }

    onInputChange(event){

      this.setState({
        [event.target.name]: event.target.value
      });
    }

    validateParams(){

      let params = {
        "query":{},
        "rememberMe": this.state.rememberAccount,
        "accountIdentifierNumber": null
      };

      params["query"][this.state.verificationType] = this.state.verificationNumber;
      params["accountIdentifierNumber"] = this.state.accountIdentifierNumber;

      return params;
    }

    async verify(params){

      let verificationResponse = await fetch("/api/subscriber/verify", {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(params)
      });

      if(verificationResponse.status == 200){
        let verificationStatus = await verificationResponse.json();

        let subscriber = verificationStatus["data"];
        this.props.onVerification(subscriber);

      }else{
        this.onVerificationError();
      }
    }

    async onSubmit(){

      let params = this.validateParams();

      if(params){
        let verificationResponse = await this.verify(params);
      }else{
        this.onVerificationError();
      }

      return false;
    }

    onVerificationError(){

      this.setState({
        isVerificationError: true
      });
    }

    render() {
        return (
            <>
                <Modal show={this.state.sampleOverlay} onHide={this.handleSampleOverlayClose}>
                    <Modal.Body>
                        <img src={sampleImg}/>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.questionOverlay} onHide={this.handleQuestionOverlayClose}>
                    <Modal.Body>
                        <p className="text-center"> This is to secure your Astro account and personal info from being
                            accessed by unauthorised users</p>
                        <p className="text-center mt-3">
                            <button onClick={this.handleQuestionOverlayClose} className="btn btn-secondary">Ok</button>
                        </p>
                    </Modal.Body>
                </Modal>

                <form className="form" onSubmit={this.onSubmit}>

                  <h3 className="mt-2">Verify Astro Account</h3>
                  {
                    this.state.isVerificationError &&

                    <div className="form-group">
                      <p className="alert alert-danger">
                        The Identification number and/or Astro account number you entered is invalid. Please try again
                      </p>
                    </div>
                  }
                  <div className="form-group">
                    <p>
                      <b>ID NUMBER </b>
                      <a className="pull-right visitLink"
                          onClick={this.handleQuestionOverlayOpen} >
                                    Why need this ?
                      </a>
                    </p>
                  </div>
                  <div className="form-group">

                      <select name="verificationType" className="form-control" value={this.state.verificationType} onChange={this.onInputChange} required>
                          <option value={VerificationType.MYKAD.value}>MyKad Number</option>
                          <option value={VerificationType.OLD_NRIC.value}>Old NRIC number</option>
                          <option value={VerificationType.PASSPORT.value}>Passport Number</option>
                          <option value={VerificationType.ARMY.value}>Army ID number</option>
                          <option value={VerificationType.POLICE.value}>Police ID Number</option>
                          <option value={VerificationType.NAVY.value}>Navy ID Number</option>
                      </select>
                  </div>
                  <div className="form-group">
                      <input name="verificationNumber"
                              value={this.state.verificationNumber}
                              onChange={this.onInputChange}
                              type="text"
                              className="form-control"
                              placeholder="E.g. 570303135700"
                              required
                              />
                      {
                        this.state.isVerificationError &&
                        <p className="alert alert-danger">ID number doesn't exist</p>
                      }
                  </div>
                  <p>
                    <b>Account/Smartcard Number</b>
                    <a className="visitLink pull-right" onClick={this.handleSampleOverlayOpen}>
                            Sample
                    </a>
                  </p>
                  <div className="form-group">
                      <input name="accountIdentifierNumber" value={this.state.accountIdentifierNumber}
                              onChange={this.onInputChange}
                              type="number"
                              className="form-control"
                              placeholder="E.g. 570303135700"
                              required
                              />
                      {
                        this.state.isVerificationError &&
                        <p className="alert alert-danger">Account number doesn't exist</p>
                      }
                  </div>
                  <div className="form-group">
                      <input name="rememberAccount" value={this.state.rememberAccount} onChange={this.onInputChange} type="checkbox" className="form-control"/>
                      <label> Remember Account Number</label>
                  </div>
                  <div className=" text-center">
                      <button className="btn btn-secondary" onClick={this.props.onCancelled}>
                        Cancel
                      </button>
                      <a className="btn ml-2 " onClick={this.onSubmit} style={{backgroundColor: '#e6007d', borderColor: '#e6007d'}}>
                        Submit
                      </a>
                  </div>
                </form>
            </>
        );
    }
}

export default VerificationOverlay;

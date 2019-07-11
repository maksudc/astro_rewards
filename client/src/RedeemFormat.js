import React from "react";

class RedeemFormat extends React.Component{

  render(){

    let message = null;
    if(this.props.format == "online"){
      message = "Redeem Online";
    }else if(this.props.format == "store"){
      message = "Redeem at Participating Store";
    }

    return (
      <p>
        {message}
      </p>
    );
  }
};

export default RedeemFormat;

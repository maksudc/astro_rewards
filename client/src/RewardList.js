import React from "react";
import RewardCard from "./RewardCard";
import './assets/css/RewardList.css';

class RewardList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rewards: [],
            sortKey: "createdAt:DESC"
        };

        this.sortKey = this.state.sortKey;

        this.sortBy = this.sortBy.bind(this);
        this.loadRewards = this.loadRewards.bind(this);
    }

    sortBy(e) {

      this.setState({
        sortKey: e.target.value
      });

      this.sortKey = e.target.value;

      this.loadRewards();
    }

    render() {

        return (
            <div className="container">
                <select value={this.state.sortKey} onChange={this.sortBy}>
                    <option value="createdAt:DESC">Latest</option>
                    <option value="expiry_date:ASC">Expiring Soon</option>
                    <option value="flash:DESC">Flash Sales</option>
                    <option value="title:ASC">A-Z</option>
                    <option value="title:DESC">Z-A</option>
                </select>

                <div className="row">
                    {
                        this.state.rewards.map((rewardObject) =>
                            <div key={rewardObject.id} className="col-sm-4" style={{"padding-top": 15}}>
                                <RewardCard
                                    key={rewardObject.id}
                                    {...rewardObject}
                                />
                            </div>
                        )
                    }
                </div>
            </div>

        );
    }

    componentDidMount() {

      this.loadRewards();
    }

    loadRewards(){

      let component = this;

      fetch("/api/rewards/?" + "sortKey=" + this.sortKey)
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          component.setState({
              rewards: data
          });
      });
    }
};

export default RewardList;

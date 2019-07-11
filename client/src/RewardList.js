import React from "react";
import RewardCard from "./RewardCard";
import './assets/css/RewardList.css';

const DATA = [
  {
    "id": 1,
    "partner": {
      "id": 1,
      "name": "GO SHOP",
      "logo": "http://image.goshop.com.my/resources/ms/image/common/h1_logo.png"
    },
    "title": "60% OFF for LG 55\" 4K Smart UHD LED TV. Only 500 Units !",
    "flash": true,
    "format": "online",
    "start_date": "2019-07-11 00:00:00",
    "expiry_date": "2019-07-14 00:00:00",
    "banner": "http://localhost:3000/static/images/banners/sample_banner.jpeg"
  },
  {
    "id": 2,
    "partner": {
      "id": 1,
      "name": "GO SHOP",
      "logo": "http://image.goshop.com.my/resources/ms/image/common/h1_logo.png"
    },
    "title": "15% OFF for VIVO  V15 PRO Smartphone. Only 300 Units !",
    "flash": true,
    "format": "online",
    "start_date": "2019-07-27 00:00:00",
    "expiry_date": "2019-07-14 00:00:00",
    "banner": "http://localhost:3000/static/images/banners/sample_banner.jpeg"
  },
  {
    "id": 3,
    "partner": {
      "id": 2,
      "name": "LA JUICERIA",
      "logo": "http://lajuiceria.com.my/wp/wp-content/uploads/2014/04/logo_trial.png"
    },
    "title": "RM 9.99 For all Build-Your-Own Super Juices",
    "flash": false,
    "format": "store",
    "start_date": "2019-07-11 00:00:00",
    "expiry_date": "2019-07-24 00:00:00",
    "banner": "http://localhost:3000/static/images/banners/sample_banner.jpeg"
  },
  {
    "id": 5,
    "partner": {
      "id": 3,
      "name": "ZALORA",
      "logo": "http://localhost:3000/static/images/partners/zalora.png"
    },
    "title": "Get 20% Off Storewide",
    "flash": false,
    "format": "online",
    "start_date": "2019-07-11 00:00:00",
    "expiry_date": "2019-07-24 00:00:00",
    "banner": "http://localhost:3000/static/images/banners/sample_banner.jpeg"
  },
  {
    "id": 6,
    "partner": {
      "id": 4,
      "name": "TICKET2U",
      "logo": "https://www.ticket2u.com.my/ticket2u/public/img/brand/logo-white.svg"
    },
    "title": "RM 50 Off for 2 VIP tickets to Jason Mraz Good Vibes Tour in KL",
    "flash": false,
    "format": "online",
    "start_date": "2019-07-11 00:00:00",
    "expiry_date": "2019-07-24 00:00:00",
    "banner": "http://localhost:3000/static/images/banners/sample_banner.jpeg"
  }
];

class RewardList extends React.Component{

  render(){
    return (
      <div>
        {DATA.map(rewardObject => <RewardCard key={rewardObject.id} ...rewardObject />)}
      </div>
    );
  }
};

export default RewardList;

import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/css/style.css';

import App from './App';
import RewardList from "./RewardList";

import * as serviceWorker from './serviceWorker';
// import { Router, Route, Link } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RewardDetails from "./RewardDetails";
import BarcodeGenerator from "./BarcodeGenerator";

function MainRouter(){

  return (
    <Router>
      <Route exact path="/" component={RewardList} />
      <Route exact path="/details/:id" component={RewardDetails} />
    </Router>
  );
};

ReactDOM.render(<MainRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Search from '../Search';
import history from './history';
import Landing from'../Landing'
import Reviews from'../Reviews'
import Recommendations from'../Recommendations'

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/search" exact component={Search} />
      <Route path="/reviews" exact component={Reviews} />
      <Route path="/recommendations" exact component={Recommendations} />
      </Switch>
    </Router>
  );
}
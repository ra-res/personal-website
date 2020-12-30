import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Aboutme from "../Components/Aboutme";
import App from "../App";
import Nav from "../Components/Nav";

export default function Routes() {
  return (
    <Switch>
      <Route path="/aboutme" exact component={Aboutme} />
      <Route path="/projects" exact component={Nav} />
    </Switch>
  );
}

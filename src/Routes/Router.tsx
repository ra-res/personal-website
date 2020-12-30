import { Switch, Route, Router } from "react-router-dom";
import Aboutme from "../Components/Aboutme";
import Nav from "../Components/Nav";
import Home from "../Components/Home";
import History from "../Routes/History";

export default function CustomRouter() {
  return (
    <Router history={History}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={Aboutme} />
        <Route path="/projects" exact component={Nav} />
      </Switch>
    </Router>
  );
}

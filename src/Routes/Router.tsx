import { Switch, Route, Router } from "react-router-dom";
import Aboutme from "../Components/Aboutme";
import Home from "../Components/Home";
import History from "../Routes/History";
import Projects from "../Components/Projects";
import Skills from "../Components/Skills";
import OpenSource from "../Components/OpenSource";
import ContactMe from "../Components/ContactMe";

export default function CustomRouter() {
  return (
    <Router history={History}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={Aboutme} />
        <Route path="/projects" exact component={Projects} />
        <Route path="/skills" exact component={Skills} />
        <Route path="/opensource" exact component={OpenSource} />
        <Route path="/contact" exact component={ContactMe} />
      </Switch>
    </Router>
  );
}

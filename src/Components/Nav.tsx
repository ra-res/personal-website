import * as React from "react";
import "./Styles/Nav.scss";
import MenuList from "./MenuList";
import { Route, Link, Router } from "react-router-dom";
import History from "../Routes/History";

export default class Nav extends React.Component {
  state = { matches: window.matchMedia("(max-width: 10000px)").matches };

  componentDidMount() {
    const handler = (e: any) => this.setState({ matches: e.matches });
    window.matchMedia("(min-width: 1000px)").addListener(handler);
  }

  public mapComponent = () => {
    return (
      <Router history={History}>
        {" "}
        <p className="nav__title"> {"<Rares Purtan/>"} </p>
        {MenuList.map((item: any, index: any) => {
          return (
            <Link to={item.url} className="nav__list-elem" key={index}>
              {item.title}
              <Route path={item.url} component={item.cName} />
            </Link>
          );
        })}
      </Router>
    );
  };

  render() {
    return (
      <div>
        {this.state.matches && (
          <div className="nav__container">{this.mapComponent()}</div>
        )}
        {!this.state.matches && (
          <div className="nav__container-mobile">{this.mapComponent()} </div>
        )}
      </div>
    );
  }
}

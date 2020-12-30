import * as React from "react";
import "./Styles/Nav.scss";
import MenuList from "./MenuList";

export default class Nav extends React.Component {
  state = { matches: window.matchMedia("(min-width: 1000px)").matches };

  componentDidMount() {
    const handler = (e: any) => this.setState({ matches: e.matches });
    window.matchMedia("(min-width: 1000px)").addListener(handler);
  }

  public mapComponent = (cName: string) => {
    return (
      <div className={cName}>
        {MenuList.map((item: any, index: any) => {
          return (
            <a href={item.url} className={item.class} key={index}>
              {item.title}
            </a>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        {console.log(this.state.matches)}
        {this.state.matches && (
          <div className="nav__container">
            {this.mapComponent("nav__container")}
          </div>
        )}
        {!this.state.matches && (
          <div className="nav__container-mobile">
            {this.mapComponent("nav__container-mobile")}{" "}
          </div>
        )}
      </div>
    );
  }
}

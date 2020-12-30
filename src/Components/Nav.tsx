import * as React from "react";
import "./Styles/Nav.scss";
import MenuList from "./MenuList";

class Nav extends React.Component {
  state = { matches: window.matchMedia("(max-width: 10000px)").matches };

  componentDidMount() {
    const handler = (e: any) => this.setState({ matches: e.matches });
    window.matchMedia("(min-width: 1000px)").addListener(handler);
  }

  render() {
    return (
      <div>
        {this.state.matches && (
          <div className="nav__container">
            {" "}
            <p className="nav__title"> {"<Rares Purtan/>"} </p>
            {MenuList.map((item: any, index: any) => {
              return (
                <p className="nav__list-elem" key={index}>
                  {item.title}
                </p>
              );
            })}
          </div>
        )}
        {!this.state.matches && (
          <div className="nav__container-mobile">
            {" "}
            <p className="nav__title"> {"<Rares Purtan/>"} </p>
            {MenuList.map((item: any, index: any) => {
              return (
                <p className="nav__list-elem" key={index}>
                  {item.title}
                </p>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Nav;

import * as React from "react";
import "./Styles/Nav.scss";
import MenuList from "./MenuList";

class Nav extends React.Component {
  render() {
    return (
      <div className="nav__container">
        <p className="nav__title"> {"<Rares Purtan/>"} </p>
        {MenuList.map((item: any, index: any) => {
          return (
            <p className="nav__list-elem" key={index}>
              {item.title}
            </p>
          );
        })}
      </div>
    );
  }
}

export default Nav;

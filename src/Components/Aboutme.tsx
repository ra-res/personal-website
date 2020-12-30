import * as React from "react";
import "./Styles/Aboutme.scss";
import Data from "./Data";
class AboutMe extends React.Component {
  render() {
    return (
      <div className="aboutme__container">
        <p className="aboutme__title"> ---About Me--- </p>
        <p className="aboutme__text"> {Data} </p>
      </div>
    );
  }
}

export default AboutMe;

import "./App.scss";
import AboutMe from "./Components/Aboutme";
// import Footer from "./Components/Footer";
import Nav from "./Components/Nav";
// import History from "./Routes/History";
// import Routes from "./Routes/Router";
// import { Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Router history={History}>
        <Routes />
      </Router> */}
      <Nav />
      <AboutMe />
      {/* <Footer /> */}
    </div>
  );
}

export default App;

import "./App.scss";
import Nav from "./Components/Nav";
import CustomRouter from "./Routes/Router";

export default function App() {
  return (
    <div className="App">
      <Nav />
      <CustomRouter />
    </div>
  );
}

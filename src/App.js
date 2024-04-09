import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./container/Dashboard";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <Dashboard />
      </RecoilRoot>
    </div>
  );
}

export default App;

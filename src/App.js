import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./container/Dashboard";
import { RecoilRoot } from "recoil";
import useWebWorker from "./hooks/useWebWorker";

function App() {
  function workerFunction() {
    this.onmessage = function (e) {
      this.postMessage("Message from worker function");
    };
  }
  const { result, error, loadng } = useWebWorker(workerFunction, "some data");
  return (
    <div className="App">
      <RecoilRoot>
        <p>{`testing web worker functionality: ${result}`}</p>
        <Dashboard />
      </RecoilRoot>
    </div>
  );
}

export default App;

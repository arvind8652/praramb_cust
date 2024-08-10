import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./container/Dashboard";
import { RecoilRoot } from "recoil";
import useWebWorker from "./hooks/useWebWorker";

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("./service-worker.js")
//     .then(function (registration) {
//       console.log("Service Worker registered with scope:", registration.scope);
//     })
//     .catch(function (error) {
//       console.log("Service Worker registration failed:", error);
//     });
// }

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js", { type: "module" })
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.log("Service Worker registration failed:", error);
    });
}

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

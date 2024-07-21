const { useCallback, useEffect } = require("react");
const { useState } = require("react");

const useWebWorker = (workerFunction, inputData) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loadng, setLoading] = useState(false);

  const memoizedWorkerFunction = useCallback(workerFunction, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      const code = memoizedWorkerFunction.toString();
      const blob = new Blob([`(${code})()`], {
        type: "application/javascript",
      });
      const workerScriptUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerScriptUrl);
      worker.postMessage(inputData);
      worker.onmessage = (e) => {
        setResult(e.data);
        setLoading(false);
      };
      worker.onerror = (e) => {
        setError(e.message);
        setLoading(false);
      };

      return () => {
        worker.terminate();
        URL.revokeObjectURL(workerScriptUrl);
      };
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, [inputData, memoizedWorkerFunction]);
  return { result, error, loadng };
};

export default useWebWorker;

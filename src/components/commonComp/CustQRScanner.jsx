import React, { useRef, useState, useEffect } from "react";
import jsQR from "jsqr";

const CustQRScanner = (props) => {
  const {
    handleScannedResult = () => {},
    errorResp = null,
    modalClosed = true,
    setErrorResp = () => {},
  } = props;
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scanned, setScanned] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [cameraList, setCameraList] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);

  useEffect(() => {
    // When the component mounts, get the list of available cameras
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === "videoinput");
      setCameraList(cameras);
      if (cameras.length > 0) {
        setSelectedCamera(cameras[0].deviceId);
        setErrorResp(null);
      } else {
        setErrorResp("We are unable to detect a camera");
      }
    });
  }, []);

  useEffect(() => {
    if (!modalClosed) {
      stopScanning();
    }
  }, [modalClosed]);

  const startScanning = () => {
    setIsScanning(true);
    scan();
  };

  const stopScanning = () => {
    setIsScanning(false);
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCameraChange = (event) => {
    setSelectedCamera(event.target.value);
    stopScanning();
  };

  const scan = () => {
    if (!isScanning || !selectedCamera) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      let animationFrameId;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });

          if (code) {
            handleScannedResult(code.data);
            setScanned(code.data);
            stopScanning();
          }
        }
      };

      const constraints = {
        video: {
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
        },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          video.srcObject = stream;
          video.play();
          animate();
        })
        .catch((error) => {
          console.error("Error accessing camera:", error);
        });
    }
  };

  return (
    <div>
      <div className="d-flex">
        <label htmlFor="cameraSelect">Select Camera:</label>
        <select
          className="form-select"
          id="cameraSelect"
          onChange={handleCameraChange}
          value={selectedCamera || ""}
        >
          {cameraList.map((camera) => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-center py-2">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ maxWidth: "100%", borderRadius: "10px" }}
        />
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {errorResp && (
        <p className="d-flex justify-content-center text-danger">{errorResp}</p>
      )}
      <div className="d-flex justify-content-center">
        {/* {scanned && <p>Scanned Result: {scanned}</p>} */}
        {!isScanning ? (
          <button
            className="btn btn-primary btn-sm"
            disabled={selectedCamera === null}
            onClick={startScanning}
          >
            Start Scan
          </button>
        ) : (
          <button className="btn btn-danger btn-sm" onClick={stopScanning}>
            Stop Scan
          </button>
        )}
      </div>
    </div>
  );
};

export default CustQRScanner;

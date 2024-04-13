import React, { useRef, useEffect, useState } from "react";

const ColorCamera = (props) => {
  const [centerColor, setCenterColor] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = { video: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  }, []);

  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");

    processFrame();
  }, []);
  function processFrame() {
    let canvas = canvasRef.current;
    let ctx = canvas.getContext("2d");
    let video = videoRef.current;
    canvas.width = 300;
    canvas.height = 300;
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const canvasAspectRatio = canvas.width / canvas.height;

    let sourceWidth, sourceHeight, sourceX, sourceY;

    // Calculate source rectangle based on the aspect ratios
    if (videoAspectRatio > canvasAspectRatio) {
      // Video is wider than canvas, crop sides
      sourceWidth = video.videoHeight * canvasAspectRatio;
      sourceHeight = video.videoHeight;
      sourceX = (video.videoWidth - sourceWidth) / 2;
      sourceY = 0;
    } else {
      // Video is taller than canvas, crop top and bottom
      sourceWidth = video.videoWidth;
      sourceHeight = video.videoWidth / canvasAspectRatio;
      sourceX = 0;
      sourceY = (video.videoHeight - sourceHeight) / 2;
    }

    ctx.drawImage(
      video,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
    const centerX = Math.floor(canvas.width / 2);
    const centerY = Math.floor(canvas.height / 2);
    const pixelData = ctx.getImageData(centerX, centerY, 1, 1).data;
    const r = pixelData[0];
    const g = pixelData[1];
    const b = pixelData[2];
    let color = RGBToHSL(r, g, b);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.rect(centerX - 3, centerY - 20, 6, 40);
    ctx.rect(centerX - 20, centerY - 3, 40, 6);
    ctx.fill();
    requestAnimationFrame(processFrame);
  }
  function RGBToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = 50;
    l = 50;
    setCenterColor(Math.round((h / 360) * props.numSections));
    return "hsl(" + h + "," + s + "%," + l + "%)";
  }
  function handleOnClick(event) {
    if (props.colorA !== -1 && props.colorB !== -1) {
      return;
    } else if (props.colorA === -1) {
      console.log(centerColor);
      props.setColorA(centerColor);
    } else {
      props.setColorB(centerColor);
    }
  }

  return (
    <div>
      <video ref={videoRef} autoPlay hidden />
      <canvas ref={canvasRef} onClick={handleOnClick} />
    </div>
  );
};
export { ColorCamera };

import React, { useRef, useEffect, useState } from "react";
import { ChiqueLogo } from "./ChiqueLogo";
import * as tf from "@tensorflow/tfjs";
import masterList from "./masterList";
import { Swatch } from "./Swatch";
const ColorCamera = (props) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState([]);
  const averageArea = 21;
  const offset = Math.floor(averageArea / 2);
  const [model, setModel] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [tracks, setTracks] = useState([]);
  useEffect(() => {
    tf.loadLayersModel("./mymodel.json").then((model) => {
      setModel(model);
      console.log("Model loaded");
    });
  }, []);
  var circle = {
    x: 100,
    y: 100,
    radius: 20,
    color: [255, 255, 255],
    isDragging: false,
  };
  var temp1 = {
    x: 200,
    y: 100,
    radius: 20,
    color: [255, 255, 255],
    isDragging: false,
  };
  const [circle1, setCircle1] = useState(circle);
  const [circle2, setCircle2] = useState(temp1);
  function predict(newData) {
    const output = model.predict(tf.tensor2d(newData, [1, 6]));
    const sync = output.dataSync();
    const predicted = [
      Math.round(sync[0]),
      Math.round(sync[1]),
      Math.round(sync[2]),
    ];
    console.log(predicted);
    const color = findClosestRGB(predicted);
    console.log(color);
    setPrediction(color);
  }
  function findClosestRGB(targetRGB) {
    let closestBM = null;
    let bmDifference = Number.MAX_VALUE;
    let closestSW = null;
    let swDifference = Number.MAX_VALUE;
    let closestPPG = null;
    let ppgDifference = Number.MAX_VALUE;
    let closestFB = null;
    let fbDifference = Number.MAX_VALUE;
    let closestBehr = null;
    let behrDifference = Number.MAX_VALUE;
    let closestValspar = null;
    let valsparDifference = Number.MAX_VALUE;
    masterList.forEach((entry) => {
      let difference = 0;

      for (let i = 0; i < 3; i++) {
        difference += Math.abs(entry.rgb[i] - targetRGB[i]);
      }
      switch (entry.brand) {
        case "Benjamin Moore":
          if (difference < bmDifference) {
            closestBM = entry;
            bmDifference = difference;
          }
          break;
        case "Sherwin Williams":
          if (difference < swDifference) {
            closestSW = entry;
            swDifference = difference;
          }
          break;
        case "PPG / Glidden":
          if (difference < ppgDifference) {
            closestPPG = entry;
            ppgDifference = difference;
          }
          break;
        case "Farrow and Ball":
          if (difference < fbDifference) {
            closestFB = entry;
            fbDifference = difference;
          }
          break;
        case "Behr":
          if (difference < behrDifference) {
            closestBehr = entry;
            behrDifference = difference;
          }
          break;
        case "Valspar":
          if (difference < valsparDifference) {
            closestValspar = entry;
            valsparDifference = difference;
          }
          break;
      }
    });
    const allColors = [
      closestBM,
      closestSW,
      closestPPG,
      closestFB,
      closestBehr,
      closestValspar,
    ];
    for (let i = 0; i < allColors.length; i++) {
      if (allColors[i] === null) {
        allColors.splice(i, 1);
      }
    }
    // document.body.style.backgroundColor = closestBM.hex;
    return allColors;
  }

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: "environment",
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    processFrame(ctx, videoRef.current);
  }, [photo]);
  function processFrame(ctx, video) {
    if (photo) {
      processPhoto(ctx, photo);
    } else {
      let canvas = canvasRef.current;
      canvas.width = 720;
      canvas.height = 480;
      const videoAspectRatio = video.videoWidth / video.videoHeight;
      const canvasAspectRatio = canvas.width / canvas.height;

      let sourceWidth, sourceHeight, sourceX, sourceY;
      if (videoAspectRatio > canvasAspectRatio) {
        sourceWidth = video.videoHeight * canvasAspectRatio;
        sourceHeight = video.videoHeight;
        sourceX = (video.videoWidth - sourceWidth) / 2;
        sourceY = 0;
      } else {
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
      drawCircle1(ctx);
      drawCircle2(ctx);
    }
    requestAnimationFrame(() => processFrame(ctx, video));
  }
  function processPhoto(ctx, photo) {
    const photoBlob = new Image();
    photoBlob.src = photo;
    ctx.drawImage(
      photoBlob,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    drawCircle1(ctx);
    drawCircle2(ctx);
  }
  function colorString(rgb) {
    return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
  }
  function setColors() {
    // setWhite(circle1.color);
    //setTargetColor(circle2.color);
  }
  function getColors(ctx) {
    let imageData = ctx.getImageData(
      circle1.x - offset,
      circle1.y - offset,
      averageArea,
      averageArea
    ).data;
    let totalR = 0;
    let totalG = 0;
    let totalB = 0;
    for (let i = 0; i < imageData.length; i += 4) {
      totalR += imageData[i];
      totalG += imageData[i + 1];
      totalB += imageData[i + 2];
    }
    let averageR = Math.round(totalR / (averageArea * averageArea));
    let averageG = Math.round(totalG / (averageArea * averageArea));
    let averageB = Math.round(totalB / (averageArea * averageArea));
    for (let i = 0; i < imageData.length; i += 4) {
      imageData[i] = averageR;
      imageData[i + 1] = averageG;
      imageData[i + 2] = averageB;
    }
    var temp = circle1;
    temp.color = [averageR, averageG, averageB];
    setCircle1(temp);
    imageData = ctx.getImageData(
      circle2.x - offset,
      circle2.y - offset,
      averageArea,
      averageArea
    ).data;
    totalR = 0;
    totalG = 0;
    totalB = 0;
    for (let i = 0; i < imageData.length; i += 4) {
      totalR += imageData[i];
      totalG += imageData[i + 1];
      totalB += imageData[i + 2];
    }
    averageR = Math.round(totalR / (averageArea * averageArea));
    averageG = Math.round(totalG / (averageArea * averageArea));
    averageB = Math.round(totalB / (averageArea * averageArea));
    for (let i = 0; i < imageData.length; i += 4) {
      imageData[i] = averageR;
      imageData[i + 1] = averageG;
      imageData[i + 2] = averageB;
    }
    temp = circle2;
    temp.color = [averageR, averageG, averageB];
    setCircle2(temp);
  }

  function swatch(color) {
    let output = [];
    for (let i = 0; i < color.length; i++) {
      output.push(
        <Swatch
          color={color[i]}
          key={"predict" + i}
          saveColor={props.saveColor}
          removeColor={props.removeColor}
        />
      );
    }
    return output;
  }

  function colorString(color) {
    let r = color[0];
    let g = color[1];
    let b = color[2];

    return "rgb(" + r + "," + g + "," + b + ")";
  }

  function onMouseDown(event) {
    var mouseX = event.clientX - event.target.getBoundingClientRect().left;
    var mouseY = event.clientY - event.target.getBoundingClientRect().top;

    if (isMouseInsideCircle(mouseX, mouseY, circle1)) {
      var temp = circle1;
      temp.isDragging = true;
      setCircle1(temp);
    } else if (isMouseInsideCircle(mouseX, mouseY, circle2)) {
      var temp = circle2;
      temp.isDragging = true;
      setCircle2(temp);
    }
  }

  function onMouseMove(event) {
    var mouseX = event.clientX - event.target.getBoundingClientRect().left;
    var mouseY = event.clientY - event.target.getBoundingClientRect().top;
    if (circle1.isDragging) {
      var temp = circle1;
      temp.x = mouseX;
      temp.y = mouseY;
      setCircle1(temp);
    } else if (circle2.isDragging) {
      var temp = circle2;
      temp.x = mouseX;
      temp.y = mouseY;
      setCircle2(temp);
    }
  }

  function isMouseInsideCircle(mouseX, mouseY, circle) {
    var dx = mouseX - circle.x;
    var dy = mouseY - circle.y;
    const result = dx * dx + dy * dy <= circle.radius * circle.radius;
    return result;
  }

  function onMouseUp(event) {
    var temp = circle1;
    temp.isDragging = false;
    setCircle1(temp);
    var temp = circle2;
    temp.isDragging = false;
    setCircle2(temp);
    predict([
      circle1.color[0],
      circle1.color[1],
      circle1.color[2],
      circle2.color[0],
      circle2.color[1],
      circle2.color[2],
    ]);
  }
  function drawCircle1(ctx) {
    ctx.beginPath();
    ctx.rect(
      circle1.x - circle1.radius,
      circle1.y - circle1.radius,
      circle1.radius * 2,
      circle1.radius * 2
    );
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(circle1.x, circle1.y, circle1.radius, 0, Math.PI * 2);
    try {
      getColors(ctx);
      ctx.fillStyle = colorString(circle1.color);
    } catch (error) {
      ctx.fillStyle = "white";
    }
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }
  function drawCircle2(ctx) {
    getColors(ctx);
    ctx.beginPath();
    ctx.moveTo(circle2.x, circle2.y - 1.5 * circle2.radius);
    ctx.lineTo(circle2.x, circle2.y + 1.5 * circle2.radius);
    ctx.moveTo(circle2.x - 1.5 * circle2.radius, circle2.y);
    ctx.lineTo(circle2.x + 1.5 * circle2.radius, circle2.y);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(circle2.x, circle2.y, circle2.radius, 0, Math.PI * 2);
    try {
      ctx.fillStyle = colorString(circle2.color);
    } catch (error) {
      console.log(error);
      ctx.fillStyle = "red";
    }
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  function switchIcon() {
    if (tracks.length > 1) {
      return (
        <img src={"./switchIcon.png"} style={{ width: 100, height: 100 }} />
      );
    }
  }
  return (
    <div
      style={{
        justifyText: "center",
        fontSize: 24,
        justifyItems: "center",
        color: "black",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ fontSize: 36, color: "black", margins: 30 }}>
        AI Paint Identifier
      </div>
      <>
        Place a sheet of white copy paper on the painted surface. Use the webcam
        or upload a photo of the painted surface. Then click and drag the white
        circle to the white area and the black circle to the painted area. The
        AI will use the lightness and color of the white to identify the paint
        color. It will provide the closest matches from different paint brands.
      </>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        style={{ margins: 30 }}
      />
      <video ref={videoRef} autoPlay hidden />
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ stretch: "both", width: 720, height: 480 }}
      />
      <div style={{ display: "flex" }}>{swatch(prediction)}</div>
    </div>
  );
};
export { ColorCamera };

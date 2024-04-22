import React, { useEffect, useRef, useState } from "react";
import { PaintFinder } from "./PaintFinder";
import { ChiqueLogo } from "./ChiqueLogo";
function ColorMeter() {
  const hNodes = 24;
  const sNodes = 8;
  const lNodes = 16;
  const sectionWidth = 40;
  const radius = 15;
  const barHeight = 10;
  const canvasHeight = 100;
  const barStart = canvasHeight / 2 - barHeight / 2;
  const hueRef = useRef(null);
  const saturationRef = useRef(null);
  const lightnessRef = useRef(null);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(92.5);
  const [lightness, setLightness] = useState(48.5);
  const [down, setDown] = useState(false);
  const draw = ([hctx, sctx, lctx]) => {
    hctx.clearRect(0, 0, sectionWidth * hNodes, canvasHeight);
    sctx.clearRect(0, 0, sectionWidth * sNodes, canvasHeight);
    lctx.clearRect(0, 0, sectionWidth * lNodes, canvasHeight);
    for (let i = 0; i < hNodes; i++) {
      hctx.fillStyle = `hsl(${i * (360 / hNodes)}, ${saturation}%, ${
        lightness + 5
      }%)`;
      hctx.fillRect(
        clamp(i, 0.5, hNodes) * sectionWidth,
        barStart,
        i < hNodes - 1 ? sectionWidth : sectionWidth / 2,
        barHeight
      );
      hctx.beginPath();
      hctx.arc(
        i * sectionWidth + sectionWidth / 2,
        canvasHeight / 2,
        radius,
        0,
        2 * Math.PI
      );
      hctx.fill();
      drawCircle(hctx, hue * ((sectionWidth * hNodes) / 360), canvasHeight / 2);
    }
    for (let i = 0; i < sNodes; i++) {
      sctx.fillStyle = `hsl(${hue}, ${i * (100 / sNodes) + 5}%, ${lightness}%)`;
      sctx.fillRect(
        clamp(i, 0.5, sNodes) * sectionWidth,
        barStart,
        i < sNodes - 1 ? sectionWidth : sectionWidth / 2,
        barHeight
      );
      sctx.beginPath();
      sctx.arc(
        i * sectionWidth + sectionWidth / 2,
        canvasHeight / 2,
        radius,
        0,
        2 * Math.PI
      );
      sctx.fill();
      drawCircle(
        sctx,
        (saturation - 5) * ((sectionWidth * sNodes) / 100) - sectionWidth,
        canvasHeight / 2
      );
    }
    for (let i = 0; i < lNodes; i++) {
      lctx.fillStyle = `hsl(${hue}, ${saturation + 5}%, ${
        i * (100 / lNodes) + 5
      }%)`;
      lctx.fillRect(
        clamp(i, 0.5, lNodes) * sectionWidth,
        barStart,
        i < lNodes - 1 ? sectionWidth : sectionWidth / 2,
        barHeight
      );
      lctx.beginPath();
      lctx.arc(
        i * sectionWidth + sectionWidth / 2,
        canvasHeight / 2,
        radius,
        0,
        2 * Math.PI
      );
      lctx.fill();
      drawCircle(
        lctx,
        (lightness - 5) * ((sectionWidth * lNodes) / 100),
        canvasHeight / 2
      );
    }
  };
  function drawCircle(ctx, x, y) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.arc(x + sectionWidth / 2, y, radius + 2, 0, 2 * Math.PI);
    ctx.stroke();
  }
  useEffect(() => {
    const hctx = hueRef.current.getContext("2d");
    const sctx = saturationRef.current.getContext("2d");
    const lctx = lightnessRef.current.getContext("2d");
    draw([hctx, sctx, lctx]);
  }, [draw]);
  function handleHover(event) {
    if (!down) return;
    const hctx = hueRef.current.getContext("2d");
    const sctx = saturationRef.current.getContext("2d");
    const lctx = lightnessRef.current.getContext("2d");
    const x = event.clientX - event.target.offsetLeft;
    if (event.target === hueRef.current) {
      setHue(Math.floor(x / sectionWidth) * (360 / hNodes));
    } else if (event.target === saturationRef.current) {
      setSaturation(Math.ceil(x / sectionWidth) * (100 / sNodes) + 5);
    } else if (event.target === lightnessRef.current) {
      setLightness(Math.floor(x / sectionWidth) * (100 / lNodes) + 5);
    }
    draw([hctx, sctx, lctx]);
  }
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  return (
    <div style={styles.column}>
      <div style={styles.title}>Paint Finder:</div>
      <>
        Select the Hue, Tone, Tint, and Shade of the color you are looking for,
        and receive a list of all the paints that match closest to your color.
      </>
      <canvas
        ref={hueRef}
        width={sectionWidth * hNodes}
        height={canvasHeight}
        onMouseDown={() => setDown(true)}
        onMouseUp={() => setDown(false)}
        onMouseMove={handleHover}
        onMouseLeave={() => setDown(false)}
        style={styles.meterHue}
      ></canvas>
      <div style={styles.row}>
        <canvas
          ref={saturationRef}
          width={sectionWidth * sNodes}
          height="canvasHeight"
          onMouseDown={() => setDown(true)}
          onTouchUpInside={() => setDown(false)}
          onTouchMove={handleHover}
          onTouchEnd={() => setDown(false)}
          onTouchCancel={() => setDown(false)}
          onTouchLeave={() => setDown(false)}
          onTouchStart={() => setDown(true)}
          onMouseUp={() => setDown(false)}
          onMouseMove={handleHover}
          onMouseLeave={() => setDown(false)}
          style={styles.meterSat}
        ></canvas>
        <canvas
          ref={lightnessRef}
          width={sectionWidth * lNodes}
          height="canvasHeight"
          onMouseDown={() => setDown(true)}
          onMouseUp={() => setDown(false)}
          onMouseMove={handleHover}
          onMouseLeave={() => setDown(false)}
          style={styles.meterLit}
        ></canvas>
      </div>
      <PaintFinder hsl={[hue, saturation / 100, lightness / 100]} />
    </div>
  );
}
const styles = {
  column: {
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    top: 0,
    position: "relative",
  },
  description: {
    fontSize: 16,
    top: 0,
    position: "relative",
  },
  meterHue: {
    marginBottom: 10,
  },
  meterSat: {},
  meterLit: {},
};
export { ColorMeter };

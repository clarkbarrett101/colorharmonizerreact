import { useEffect, useRef } from "react";
import { PaintFinder } from "./PaintFinder";
function PaintSelector({ props }) {
  const canvasRef = useRef(null);
  const height = 1000;
  const numSections = 5;
  const hue = 120;
  let slValues = new Array(numSections);
  for (let s = 0; s < numSections; s++) {
    slValues[s] = new Array(numSections);
    for (let l = 0; l < numSections; l++) {
      slValues[s][l] = [s * 2 + 2, l * 1.8 + 1.5];
    }
  }
  useEffect(() => {
    canvasRef.current.height = height;
    canvasRef.current.width = height;
    const ctx = canvasRef.current.getContext("2d");
    for (let s = 0; s < numSections; s++) {
      for (let l = 0; l < numSections; l++) {
        ctx.fillStyle = `hsl(${hue}, ${slValues[s][l][0] * 10}%, ${
          slValues[s][l][1] * 10
        }%)`;
        ctx.fillRect(
          (s * height) / numSections,
          (l * height) / numSections,
          height / numSections,
          height / numSections
        );
        ctx.strokeStyle = "black";
        ctx.strokeRect(
          (s * height) / numSections,
          (l * height) / numSections,
          height / numSections,
          height / numSections
        );
      }
    }
  });
  return (
    <>
      <canvas ref={canvasRef} />
      <PaintFinder h={0} s={5} l={5} />
    </>
  );
}
export { PaintSelector };

import { useEffect, useRef, useState } from "react";
import { PaintFinder } from "./PaintFinder";
function PaintSelector(props) {
  const canvasRef = useRef(null);
  const height = 200;
  const numSections = 5;
  const hue = props.h;
  const [hsl, setHSL] = useState([0, 0, 0]);
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
      }
    }
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousemove", highlight);
      canvasRef.current.addEventListener("click", handleOnClick);
    }
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousemove", highlight);

        canvasRef.current.removeEventListener("click", handleOnClick);
      }
    };
  });
  function highlight(event) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const s = Math.floor((x / height) * numSections);
    const l = Math.floor((y / height) * numSections);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < numSections; i++) {
      for (let j = 0; j < numSections; j++) {
        ctx.fillStyle = `hsl(${hue}, ${slValues[i][j][0] * 10}%, ${
          slValues[i][j][1] * 10
        }%)`;
        ctx.fillRect(
          (i * height) / numSections,
          (j * height) / numSections,
          height / numSections,
          height / numSections
        );
      }
    }
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fillRect(
      (s * height) / numSections,
      (l * height) / numSections,
      height / numSections,
      height / numSections
    );
  }
  function handleOnClick(event) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const s = Math.floor((x / height) * numSections);
    const l = Math.floor((y / height) * numSections);
    const hsl = [hue, slValues[s][l][0] * 0.1, slValues[s][l][1] * 0.1];
    setHSL(hsl);
    console.log(hsl);
    ctx.strokeStyle = "black";
    ctx.strokeRect(
      (s * height) / numSections,
      (l * height) / numSections,
      height / numSections,
      height / numSections
    );
  }
  function checkHSL() {
    if (hsl[0] === 0 && hsl[1] === 0 && hsl[2] === 0) {
      return;
    }
    return <PaintFinder hsl={hsl} />;
  }
  return (
    <>
      <canvas ref={canvasRef} />
      {checkHSL()}
    </>
  );
}
export { PaintSelector };

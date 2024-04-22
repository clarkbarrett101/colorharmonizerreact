import { useState, useEffect, useRef } from "react";
import { ColorMeter } from "./ColorMeter";
function ColorSearch() {
  const canvasRef = useRef(null);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(0);
  const [colorString, setColorString] = useState("");
  function meter() {
    return <div></div>;
  }
  function handleHueChange(event) {
    setHue(event.target.value);
  }
  function handleSaturationChange(event) {
    setSaturation(event.target.value);
  }
  function handleLightnessChange(event) {
    setLightness(event.target.value);
  }
  function hsl2rgb(h, s, l) {
    let a = s * Math.min(l, 1 - l);
    let f = (n, k = (n + h / 30) % 12) =>
      l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    const rgb = [f(0) * 255, f(8) * 255, f(4) * 255].map(Math.round).join(",");
    return `rgb(${rgb})`;
  }
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 120; j++) {
        for (let k = 0; k < 120; k++) {
          ctx.fillStyle = `hsl(${(j * 12) / 5},${100 - i * (100 / 8)}%, ${
            k * (10 / 13) + 5
          }%)`;
          ctx.fillRect(k * 3, j * 5 + i * 24, 3, 5);
        }
      }
    }
  }, [hue, saturation, lightness]);
  return (
    <>
      <canvas ref={canvasRef} width={360} height={8 * 24 * 5} />
    </>
  );
}

export { ColorSearch };

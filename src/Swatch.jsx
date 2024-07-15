import React, { useState } from "react";
function Swatch({ color, saveColor, removeColor, saved }) {
  const [isSaved, setSaved] = useState(saved);
  function getBrandLogo(color) {
    const logo =
      color.brand === "Sherwin Williams"
        ? color.hsluv[2] > 50
          ? "./sherwinlogo.png"
          : "./sherwinlogoW.png"
        : color.brand === "Behr"
        ? color.hsluv[2] > 50
          ? "./behrlogo.png"
          : "./behrlogoW.png"
        : color.brand === "Benjamin Moore"
        ? color.hsluv[2] > 50
          ? "./benmoorelogo.png"
          : "./benmoorelogoW.png"
        : color.brand === "Valspar"
        ? color.hsluv[2] > 50
          ? "./valspar.png"
          : "./valsparW.png"
        : color.brand === "PPG"
        ? color.hsluv[2] > 50
          ? "./gliddenlogo.png"
          : "./gliddenlogoW.png"
        : "./logo.png";
    return <img src={logo} alt={color.brand} style={{ width: 80 }} />;
  }
  function handleOnClick() {
    if (isSaved) {
      removeColor(color);
      setSaved(false);
    } else {
      saveColor(color);
      setSaved(true);
    }
  }
  function rgbString(rgb) {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }

  if (color === undefined) {
    return <div></div>;
  } else {
    return (
      <div
        style={{
          backgroundColor: rgbString(color.rgb),
          width: 160,
          height: 80,
          color: color.hsluv[2] > 50 ? "black" : "white",
          textAlign: "center",
          textJustify: "center",
          fontSize: 12,
          borderRadius: 10,
          zIndex: 100,
        }}
        onClick={handleOnClick}
      >
        <div style={{ fontSize: 16 }}>{color.name}</div>
        <div style={{ textJustify: "center" }}>
          {getBrandLogo(color)}: {color.label}
        </div>
      </div>
    );
  }
}
export { Swatch };

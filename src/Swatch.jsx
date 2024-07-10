import React, { useState } from "react";
function Swatch(props) {
  const [saved, setSaved] = useState(props.saved);
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
    if (saved) {
      props.removeColor(props.color);
      setSaved(false);
    } else {
      props.saveColor(props.color);
      setSaved(true);
    }
  }
  function rgbString(rgb) {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }
  return (
    <div
      style={{
        backgroundColor: rgbString(props.color.rgb),
        width: 160,
        height: 80,
        color: props.color.hsluv[2] > 50 ? "black" : "white",
        textAlign: "center",
        textJustify: "center",
        fontSize: 12,
      }}
      onClick={handleOnClick}
    >
      <div style={{ fontSize: 16 }}>{props.color.name}</div>
      <div style={{ textJustify: "center" }}>
        {getBrandLogo(props.color)}: {props.color.label}
      </div>
    </div>
  );
}
export { Swatch };

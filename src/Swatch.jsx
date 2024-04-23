import React, { useState } from "react";
function Swatch(props) {
  const [saved, setSaved] = useState(props.saved);
  function getBrandLogo(color) {
    const logo =
      color.brand === "Sherwin Williams"
        ? color.hsl[2] > 0.5
          ? "./sherwinlogo.png"
          : "./sherwinlogoW.png"
        : color.brand === "Behr"
        ? color.hsl[2] > 0.5
          ? "./behrlogo.png"
          : "./behrlogoW.png"
        : color.brand === "Benjamin Moore"
        ? color.hsl[2] > 0.5
          ? "./benmoorelogo.png"
          : "./benmoorelogoW.png"
        : color.brand === "Valspar"
        ? color.hsl[2] > 0.5
          ? "./valspar.png"
          : "./valsparW.png"
        : color.brand === "PPG / Glidden"
        ? color.hsl[2] > 0.5
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
  return (
    <div
      style={{
        backgroundColor: props.color.hex,
        width: 160,
        height: 80,
        color: props.color.hsl[2] > 0.5 ? "black" : "white",
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

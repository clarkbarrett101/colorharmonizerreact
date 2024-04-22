function Swatch({ color }) {
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
    return <img src={logo} alt={color.brand} style={{ width: 100 }} />;
  }
  return (
    <div
      style={{
        backgroundColor: color.hex,
        width: 200,
        height: 100,
        color: color.hsl[2] > 0.5 ? "black" : "white",
        textAlign: "center",
        textJustify: "center",
        fontSize: 16,
      }}
    >
      <div style={{ fontSize: 20 }}>{color.name}</div>
      <div style={{ textJustify: "center" }}>
        {getBrandLogo(color)}: {color.label}
      </div>
    </div>
  );
}
export { Swatch };

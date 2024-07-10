function RGB2HEX(rgb) {
  return (
    "#" +
    ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)
  );
}
function HEX2RGB(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}
function RGB2RYB(rgb) {
  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];
  let w = Math.min(r, g);
  let r2 = r - w;
  let y = (r + w) / 2;
  let b2 = (b - w + g) / 2;
  return [r2, y, b2];
}
function RYB2RGB(ryb) {
  let r = ryb[0];
  let y = ryb[1];
  let b = ryb[2];
  let w = Math.min(y, b);
  let r2 = r + y - w;
  let g = y + 2 * w;
  let b2 = 2 * (b - w);
  return [r2, g, b2];
}
function RGB2LUV(rgb) {
  let r = rgb[0];
  let g = rgb[1];
  let b = rgb[2];
  let y = 0.299 * r + 0.587 * g + 0.114 * b;
  let u = -0.147 * r - 0.289 * g + 0.436 * b;
  let v = 0.615 * r - 0.515 * g - 0.1 * b;
  return [y, u, v];
}
function LUV2RGB(luv) {
  let y = luv[0];
  let u = luv[1];
  let v = luv[2];
  let r = y + 1.14 * v;
  let g = y - 0.395 * u - 0.581 * v;
  let b = y + 2.032 * u;
  return [r, g, b];
}
export { RGB2HEX, HEX2RGB, RGB2RYB, RYB2RGB, RGB2LUV, LUV2RGB };

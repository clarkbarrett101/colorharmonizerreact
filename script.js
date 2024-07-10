import rybMasterList from "./src/rybMasterList.js";
import { Hsluv } from "hsluv";

let masterList = [];
for (let i = 0; i < rybMasterList.length; i++) {
  const paintColor = rybMasterList[i];
  const rgb = paintColor.rgb;
  const hsluv = new Hsluv();
  hsluv.rgb_r = rgb[0] / 255;
  hsluv.rgb_g = rgb[1] / 255;
  hsluv.rgb_b = rgb[2] / 255;
  hsluv.rgbToHsluv();
  let h = hsluv.hsluv_h;
  h = Math.round(h * 100) / 100;
  let s = hsluv.hsluv_s;
  s = Math.round(s * 100) / 100;
  let l = hsluv.hsluv_l;
  l = Math.round(l * 100) / 100;
  paintColor.hsluv = [h, s, l];
  masterList.push(paintColor);
}
import fs from "fs";
fs.writeFileSync(
  "./src/rybMasterList.json",
  JSON.stringify(masterList, null, 2)
);

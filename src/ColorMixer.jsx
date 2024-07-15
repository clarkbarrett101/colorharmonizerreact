import React, { useState, useEffect } from "react";
import masterList from "./masterList.js";
export default function ColorMixer() {
  const maxRYB = [192, 252, 189.5];
  const [paintColor, setPaintColor] = useState(null);
  const [stepRate, setStepRate] = useState(3);
  const placeholder = {
    name: "placeholder",
    brand: "placeholder",
    rgb: [0, 0, 0],
    ryb: [0, 0, 0],
    luv: [0, 0, 0],
    hsluv: [0, 0, 0],
  };
  const [closestR, setClosestR] = useState(placeholder);
  const [closestB, setClosestB] = useState(placeholder);
  const [closestY, setClosestY] = useState(placeholder);
  const [closestLup, setClosestLup] = useState(placeholder);
  const [closestLdown, setClosestLdown] = useState(placeholder);
  const [closestUV, setClosestUV] = useState(placeholder);

  const ml = masterList[Math.floor(Math.random() * masterList.length)];
  useEffect(() => {
    if (!paintColor) {
      setPaintColor(ml);
    }
  }, []);
  function RGBString(color) {
    let rgb = color;
    return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")";
  }
  function calculateDiff(color, index) {
    if (index === 0) {
      return color[0] - color[1] - color[2];
    } else if (index === 1) {
      return color[0] + color[1] - color[2] - Math.abs(color[0] - color[1]) / 2;
    } else {
      return -2 * color[0] - color[1] / 2 + color[2];
    }
  }

  function findClosestRYB(ryb, rgb, index) {
    if (!paintColor) {
      return ml;
    }

    let disList = [];
    for (let i = 0; i < masterList.length; i++) {
      let color = masterList[i].ryb;
      if (color[0] == ryb[0] && color[1] == ryb[1] && color[2] == ryb[2]) {
        continue;
      }
      let colorRgb = masterList[i].rgb;
      let diff = color[index];
      let colorRgbDiff = calculateDiff(colorRgb, index);
      let rgbDiff = calculateDiff(rgb, index);
      if (colorRgbDiff > rgbDiff) {
        let dis = Math.abs(colorRgb[0] - rgb[0]);
        dis += Math.abs(colorRgb[1] - rgb[1]);
        dis += Math.abs(colorRgb[2] - rgb[2]);
        disList.push({
          dis: dis,
          paint: masterList[i],
        });
      }
    }
    if (disList.length < 1) {
      return placeholder;
    }
    disList.sort((a, b) => {
      return a.dis - b.dis;
    });
    if (disList.length < stepRate) {
      return disList[disList.length - 1].paint;
    }

    try {
      return disList[stepRate].paint;
    } catch (e) {
      console.log(disList);
    }
  }
  function findClosestLup(hsluv) {
    let luvList = [];
    for (let i = 0; i < masterList.length; i++) {
      let color = masterList[i].hsluv;
      if (color[2] > hsluv[2]) {
        let hDiff = color[0] - hsluv[0];
        hDiff *= 4;
        let sDiff = color[1] - hsluv[1];
        sDiff *= 4;
        let lDiff = color[2] - hsluv[2];
        lDiff /= 2;
        let hsluvDiff = Math.sqrt(hDiff ** 2 + sDiff ** 2 + lDiff ** 2);
        const entry = {
          color: masterList[i],
          diff: hsluvDiff,
        };
        luvList.push(entry);
      }
    }
    if (luvList.length < 1) {
      console.log("No Lup found");
      return placeholder;
    }
    luvList.sort((a, b) => {
      return a.diff - b.diff;
    });
    if (luvList.length < stepRate) {
      return luvList[luvList.length - 1].color;
    }
    try {
      return luvList[stepRate].color;
    } catch (e) {
      return placeholder;
    }
  }
  function findClosestLdown(hsluv) {
    let luvList = [];
    for (let i = 0; i < masterList.length; i++) {
      let color = masterList[i].hsluv;
      if (color[2] < hsluv[2]) {
        let hDiff = color[0] - hsluv[0];
        hDiff *= 3;
        let sDiff = color[1] - hsluv[1];
        sDiff *= 3;
        let lDiff = color[2] - hsluv[2];
        lDiff /= 2;
        let luvDiff = Math.sqrt(hDiff ** 2 + sDiff ** 2 + lDiff ** 2);
        const entry = {
          color: masterList[i],
          diff: luvDiff,
        };
        luvList.push(entry);
      }
    }
    if (luvList.length < 1) {
      console.log("No Ldown found");
      return placeholder;
    }
    luvList.sort((a, b) => {
      return a.diff - b.diff;
    });
    if (luvList.length < stepRate) {
      return luvList[luvList.length - 1].color;
    }
    return luvList[stepRate].color;
  }
  function findClosestUV(hsluv) {
    let luvList = [];
    for (let i = 0; i < masterList.length; i++) {
      let color = masterList[i].hsluv;
      if (color[1] < hsluv[1]) {
        let hDiff = color[0] - hsluv[0];
        let sDiff = color[1] - hsluv[1];
        sDiff /= 2;
        let lDiff = color[2] - hsluv[2];
        lDiff *= 4;
        let luvDiff = Math.sqrt(hDiff ** 2 + sDiff ** 2 + lDiff ** 2);
        const entry = {
          color: masterList[i],
          diff: luvDiff,
        };
        luvList.push(entry);
      }
    }
    if (luvList.length < 1) {
      console.log("No UV found");
      return placeholder;
    }
    luvList.sort((a, b) => {
      return a.diff - b.diff;
    });
    if (luvList.length < stepRate) {
      return luvList[luvList.length - 1].color;
    }
    try {
      return luvList[stepRate].color;
    } catch (e) {
      console.log(luvList);
    }
  }

  useEffect(() => {
    if (!paintColor) {
      return;
    }
    console.log(
      "PaintColor",
      paintColor.name,
      paintColor.ryb,
      paintColor.hsluv
    );
    setClosestR(findClosestRYB(paintColor.ryb, paintColor.rgb, 0));
    setClosestY(findClosestRYB(paintColor.ryb, paintColor.rgb, 1));
    setClosestB(findClosestRYB(paintColor.ryb, paintColor.rgb, 2));
    setClosestLup(findClosestLup(paintColor.hsluv));
    setClosestLdown(findClosestLdown(paintColor.hsluv));
    setClosestUV(findClosestUV(paintColor.hsluv));
  }, [paintColor, stepRate]);

  function getYellow() {
    if (closestY.name === placeholder.name) {
      return <div style={styles.colorBox}></div>;
    }
    return (
      <div
        onClick={() => setPaintColor(closestY)}
        style={{
          ...styles.colorBox,
          backgroundColor: RGBString(closestY.rgb),
          borderColor: "yellow",
          borderBlockStyle: "solid",
          borderBottomWidth: 0,
        }}
      >
        <div>{closestY.name + " (" + closestY.brand + ")"}</div>
      </div>
    );
  }
  function getBlue() {
    if (closestB.name === placeholder.name) {
      return <div style={styles.colorBox}></div>;
    }
    return (
      <div
        onClick={() => setPaintColor(closestB)}
        style={{
          ...styles.colorBox,
          backgroundColor: RGBString(closestB.rgb),
          borderColor: "blue",
          borderBlockStyle: "solid",
          borderBottomWidth: 0,
        }}
      >
        <div>{closestB.name + " (" + closestB.brand + ")"}</div>
      </div>
    );
  }
  function getRed() {
    if (closestR.name === placeholder.name) {
      return <div style={styles.colorBox}></div>;
    }
    return (
      <div
        onClick={() => setPaintColor(closestR)}
        style={{
          ...styles.colorBox,
          backgroundColor: RGBString(closestR.rgb),
          borderColor: "red",
          borderBlockStyle: "solid",
          borderBottomWidth: 0,
        }}
      >
        <div>{closestR.name + " (" + closestR.brand + ")"}</div>
      </div>
    );
  }
  function getLightUp() {
    if (closestLup.name === placeholder.name) {
      return <div style={styles.colorBox}></div>;
    }
    return (
      <div
        onClick={() => setPaintColor(closestLup)}
        style={{
          ...styles.colorBox,
          backgroundColor: RGBString(closestLup.rgb),
          borderColor: "white",
          borderTopWidth: 0,
          borderBlockStyle: "solid",
        }}
      >
        <div>{closestLup.name + " (" + closestLup.brand + ")"}</div>
      </div>
    );
  }
  function getLightDown() {
    if (closestLdown.name === placeholder.name) {
      return <div style={styles.colorBox}></div>;
    }
    return (
      <div
        onClick={() => setPaintColor(closestLdown)}
        style={{
          ...styles.colorBox,
          backgroundColor: RGBString(closestLdown.rgb),
          borderBlockStartWidth: 0,
          borderColor: "black",
          borderBlockStyle: "solid",
        }}
      >
        <div>{closestLdown.name + " (" + closestLdown.brand + ")"}</div>
      </div>
    );
  }
  function getUV() {
    if (closestUV.name === placeholder.name) {
      return <div style={styles.colorBox}></div>;
    }
    return (
      <div
        onClick={() => setPaintColor(closestUV)}
        style={{
          ...styles.colorBox,
          backgroundColor: RGBString(closestUV.rgb),
          borderBlockStyle: "solid",
          borderBlockStartWidth: 0,
          borderColor: "gray",
        }}
      >
        <div>{closestUV.name + " (" + closestUV.brand + ")"}</div>
      </div>
    );
  }
  function stepMeter() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 50,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "15%",
            flexDirection: "row",
            display: "flex",
            flex: 1,
          }}
        >
          <img
            src={"./1 Swatch.png"}
            style={{ resizeMode: "contain", height: 100, paddingTop: 32 }}
            onClick={() => (stepRate > 1 ? setStepRate(stepRate - 1) : {})}
          />

          <div
            style={{
              fontSize: 32,
              padding: 16,
              alignContent: "center",
            }}
          >
            {stepRate}
          </div>
          <img
            onClick={() => setStepRate(stepRate + 1)}
            src={"./3 Swatches.png"}
            style={{ resizeMode: "contain", height: 150 }}
          />
        </div>
      </div>
    );
  }

  try {
    return (
      <div
        style={{
          position: "relative",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: RGBString(paintColor ? paintColor.rgb : [0, 0, 0]),
          width: "100vw",
          height: "100vh",
          top: "120px",
          flexDirection: "column",
          color: paintColor && paintColor.hsluv[2] > 50 ? "black" : "white",
        }}
      >
        {stepMeter()}
        <div
          style={{
            width: "100%",
            height: "15%",
            flexDirection: "row",
            justifyContent: "space-around",
            display: "flex",
          }}
        >
          {getRed()}
          {getYellow()}
          {getBlue()}
        </div>
        <div
          style={{
            width: "100%",
            height: "25%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            display: "flex",
          }}
        >
          <div
            style={{
              fontSize: 32,
              alignContent: "center",
              textAlign: "center",
              color: paintColor && paintColor.hsluv[2] > 50 ? "black" : "white",
            }}
          >
            {paintColor
              ? paintColor.name + " (" + paintColor.brand + ")"
              : "Loading..."}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "15%",
            flexDirection: "row",
            justifyContent: "space-around",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {getLightUp()}
          {getUV()}
          {getLightDown()}
        </div>
      </div>
    );
  } catch (e) {
    console.log(paintColor);

    return <div></div>;
  }
}
const styles = {
  colorBox: {
    width: "30%",
    height: "100%",
    borderRadius: 10,
    borderWidth: 10,
    margin: 20,
    justifyContent: "center",
    fontSize: 24,
  },
};

import hslReference from "./hslReference";
import masterList from "./masterList";
import { Swatch } from "./Swatch";
import { Hsluv } from "hsluv";
function PaintFinder({ saveColor, removeColor, hsl }) {
  console.log("PaintFinder:", saveColor, removeColor, hsl);
  const h = Math.round(hsl[0]);
  const s = Math.round(hsl[1] * 100);
  const l = Math.round(hsl[2] * 100);

  console.log(h * 100 + s * 10 + l);
  let paintList = [];
  let offset = 1;
  while (paintList.length < 5) {
    paintList = [];
    for (let i = 0; i < masterList.length; i++) {
      const color = masterList[i].hsluv;
      if (
        color[0] >= loopHue(h - offset) &&
        color[0] <= loopHue(h + offset) &&
        color[1] >= loopHue(s - offset) &&
        color[1] <= loopHue(s + offset) &&
        color[2] >= loopHue(l - offset) &&
        color[2] <= loopHue(l + offset)
      ) {
        paintList.push(masterList[i]);
      }
    }
    offset++;
  }
  function clamp(value) {
    return Math.max(0, Math.min(value, 9));
  }
  function loopHue(hue) {
    return hue < 0 ? 360 + hue : hue >= 360 ? hue - 360 : hue;
  }

  function paintListItems() {
    let items = [];
    for (let i = 0; i < paintList.length; i++) {
      if (paintList[i] === undefined) {
        continue;
      }
      items.push(
        <Swatch
          color={paintList[i]}
          saveColor={saveColor}
          removeColor={removeColor}
          saved={false}
          key={"paint" + i}
        />
      );
    }
    return items;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6,160px)",
        justifyContent: "center",
      }}
    >
      {paintListItems()}
    </div>
  );
}
export { PaintFinder };

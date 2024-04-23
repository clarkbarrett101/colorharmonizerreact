import hslReference from "./hslReference";
import masterList from "./masterList";
import { Swatch } from "./Swatch";
function PaintFinder(props) {
  const h = Math.round(props.hsl[0] / 10);
  const s = Math.round(props.hsl[1] * 9);
  const l = Math.round(props.hsl[2] * 9);

  console.log(h * 100 + s * 10 + l);
  let reflist = hslReference[h * 100 + s * 10 + l];
  let offset = 1;
  while (reflist.length < 1) {
    reflist = reflist.concat(
      hslReference[h * 100 + s * 10 + clamp(l - offset)],
      hslReference[h * 100 + s * 10 + clamp(l + offset)],
      hslReference[h * 100 + clamp(s + offset) * 10 + l],
      hslReference[h * 100 + clamp(s - offset) * 10 + l]
    );
    console.log(1, reflist.length);
    if (reflist.length < 1) {
      reflist = reflist.concat(
        hslReference[loopHue(h - offset) * 100 + s * 10 + l],
        hslReference[loopHue(h + offset) * 100 + s * 10 + l]
      );
      console.log(2, reflist.length);
    }
    if (reflist.length === 1 && reflist[0] == undefined) {
      reflist = [];
    }
    offset++;
  }
  function clamp(value) {
    return Math.max(0, Math.min(value, 9));
  }
  function loopHue(hue) {
    return hue < 0 ? 360 + hue : hue >= 360 ? hue - 360 : hue;
  }
  let paintList = [];
  for (let i = 0; i < reflist.length; i++) {
    paintList.push(masterList[reflist[i]]);
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
          saveColor={props.saveColor}
          removeColor={props.removeColor}
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

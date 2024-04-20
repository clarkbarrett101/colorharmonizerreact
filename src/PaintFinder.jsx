import hslReference from "./hslReference";
import masterList from "./masterList";
function PaintFinder(props) {
  let reflist = hslReference[props.h * 100 + props.s * 10 + props.l];
  let offset = 1;
  while (reflist.length < 3) {
    reflist = reflist.concat(
      hslReference[props.h * 100 + props.s * 10 + props.l - offset],
      hslReference[props.h * 100 + props.s * 10 + props.l + offset],
      hslReference[props.h * 100 + (props.s + offset) * 10 + props.l],
      hslReference[props.h * 100 + (props.s - offset) * 10 + props.l]
    );
    offset++;
  }
  console.log(reflist);
  let paintList = [];
  for (let i = 0; i < reflist.length; i++) {
    paintList.push(masterList[reflist[i]]);
  }
  function paintListItems() {
    let items = [];
    for (let i = 0; i < paintList.length; i++) {
      items.push(swatch(paintList[i]));
    }
    return items;
  }
  function swatch(color) {
    return (
      <div
        style={{
          backgroundColor: colorString(color),
          width: 200,
          height: 50,
          color: "black",
          textAlign: "center",
          textJustify: "center",
          paddingTop: 15,
          fontSize: 16,
        }}
      >
        {getColorName(color)}
      </div>
    );
  }
  function colorString(color) {
    const r = color.rgb[0];
    const g = color.rgb[1];
    const b = color.rgb[2];
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  function getColorName(color) {
    if (color.benmoore) {
      console.log(color.benmoore);
      return color.benmoore + "\n by Benjamin Moore";
    } else if (color.sherwin) {
      console.log(color.sherwin);
      return color.sherwin + "\n by Sherwin Williams";
    } else if (color.ppg) {
      console.log(color.ppg);
      return color.ppg + "\n by PPG / Glidden";
    } else if (color.behr) {
      console.log(color.behr);
      return color.behr + "\n by Behr";
    } else if (color.valspar) {
      console.log(color.valspar);
      return color.valspar + "\n by Valspar";
    }
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>{paintListItems()}</div>
  );
}
export { PaintFinder };

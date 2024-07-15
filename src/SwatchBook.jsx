import React, { useEffect } from "react";
import { Swatch } from "./Swatch";
export default function SwatchBook({ swatches, saveColor, removeColor }) {
  console.log("Swatches: ", swatches);
  function swatch(paintColor, i) {
    return (
      <Swatch
        color={paintColor}
        saved={true}
        saveColor={saveColor}
        removeColor={removeColor}
      />
    );
  }
  function swatchList() {
    let items = [];
    for (let i = 0; i < swatches.length; i++) {
      items.push(swatch(swatches[i]));
    }
    return items;
  }
  useEffect(() => {
    console.log("SwatchBook: ", swatches);
    swatchList();
  }, [swatches]);
  return (
    <div style={{ display: "flex", flexDirection: "row", zIndex: 5 }}>
      {swatchList()}
    </div>
  );
}

import { ChiqueLogo } from "./ChiqueLogo";
import { Swatch } from "./Swatch";
import { useState, useEffect } from "react";
function NavBar(props) {
  function setPagePaintID() {
    props.setPage(0);
  }
  function setPageColorWheel() {
    props.setPage(1);
  }
  function setPagePaintFinder() {
    props.setPage(2);
  }
  function setPageColorMixer() {
    props.setPage(3);
  }
  function paintListItems() {
    let items = [];
    for (let i = 0; i < props.paints.length; i++) {
      items.push(
        <Swatch
          color={props.paints[i]}
          saveColor={props.saveColor}
          removeColor={props.removeColor}
          saved={true}
          key={"paintLib" + i}
        />
      );
    }
    return items;
  }
  useEffect(() => {
    paintListItems();
  }, [props.paints]);
  return (
    <div
      style={{
        top: 0,
        position: "fixed",
        height: 120,
        width: "100%",
      }}
    >
      <ChiqueLogo />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          background: "linear-gradient(to right, #C76897,#E378FF, #60BDBD)",
          height: 120,
          gap: 10,
        }}
      >
        <button onClick={setPagePaintID} style={buttonStyle}>
          AI Paint Identifier
        </button>
        <button onClick={setPageColorWheel} style={buttonStyle}>
          Color Harmonizer
        </button>
        <button onClick={setPagePaintFinder} style={buttonStyle}>
          Paint Finder
        </button>
        <button onClick={setPageColorMixer} style={buttonStyle}>
          Color Mixer
        </button>
      </div>
      {/*paintListItems()*/}
    </div>
  );
}
const buttonStyle = {
  fontSize: 24,
  color: "slate",
  background: "linear-gradient(to right,#255ce7, #5a0097, #c4004e)",
  height: 50,
  padding: 10,
  borderRadius: 10,
  border: "none",
  top: 30,
  position: "relative",
};
export { NavBar };

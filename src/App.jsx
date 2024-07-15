import { useState, useEffect } from "react";
import { ColorMeter } from "./ColorMeter";
import { Driver } from "./Driver";
import { NavBar } from "./NavBar";
import { ColorCamera } from "./ColorCamera";
import ColorMixer from "./ColorMixer";
import SwatchBook from "./SwatchBook";
import masterList from "./masterList";
function App() {
  const allPages = {
    PaintID: <ColorCamera saveColor={saveColor} removeColor={removeColor} />,
    Driver: <Driver saveColor={saveColor} removeColor={removeColor} />,
    ColorMeter: <ColorMeter saveColor={saveColor} removeColor={removeColor} />,
    ColorMixer: <ColorMixer />,
  };
  document.body.style.width = "100%";
  const [currentPage, setCurrentPage] = useState(allPages.Driver);
  const paintStart = masterList[Math.floor(Math.random() * masterList.length)];
  const [paints, setPaints] = useState([paintStart]);
  useEffect(() => {
    for (let i = 0; i < paints.length; i++) {
      for (let j = 0; j < paints.length; j++) {
        if (i !== j && paints[i] === paints[j]) {
          let arr = paints;
          arr.splice(j, 1);
          setPaints(arr);
        }
      }
    }
  }, [paints]);
  function saveColor(color) {
    let arr = paints;
    arr.push(color);
    setPaints(arr);
  }
  function removeColor(color) {
    let arr = paints;
    arr = arr.filter((paint) => paint !== color);
    setPaints(arr);
  }
  function setPage(page) {
    switch (page) {
      case 0:
        setCurrentPage(allPages.PaintID);
        break;
      case 1:
        setCurrentPage(allPages.Driver);
        break;
      case 2:
        setCurrentPage(allPages.ColorMeter);
        break;
      case 3:
        setCurrentPage(allPages.ColorMixer);
        break;
      default:
        setCurrentPage(allPages.Driver);
    }
  }
  return (
    <>
      <NavBar
        setPage={setPage}
        paints={paints}
        saveColor={saveColor}
        removeColor={removeColor}
      />
      {currentPage}
      <SwatchBook
        swatches={paints}
        saveColor={saveColor}
        removeColor={removeColor}
      />
    </>
  );
}

export default App;
//TODO: Extract colorA and colorB
//TODO: Save Paints

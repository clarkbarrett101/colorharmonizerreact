import { useState } from "react";
import { ColorMeter } from "./ColorMeter";
import { Driver } from "./Driver";
import { NavBar } from "./NavBar";
import { ColorCamera } from "./ColorCamera";
import { Swatch } from "./Swatch";
function App() {
  const allPages = {
    PaintID: <ColorCamera saveColor={saveColor} removeColor={removeColor} />,
    Driver: <Driver saveColor={saveColor} removeColor={removeColor} />,
    ColorMeter: <ColorMeter saveColor={saveColor} removeColor={removeColor} />,
  };
  document.body.style.width = "100%";
  const [currentPage, setCurrentPage] = useState(allPages.Driver);
  const [paints, setPaints] = useState([]);
  function saveColor(color) {
    let arr = paints;
    arr.push(color);
    setPaints(arr);
  }
  function removeColor(color) {
    let arr = paints;
    let index = arr.indexOf(color);
    arr.splice(index, 1);
    console.log(arr);
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
    </>
  );
}

export default App;
//TODO: Extract colorA and colorB
//TODO: Save Paints

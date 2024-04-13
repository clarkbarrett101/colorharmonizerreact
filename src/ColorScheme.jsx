import { MiniColorWheel } from "./index";
function ColorScheme(props) {
  function getColorSchemes() {
    let output = [];
    for (var i = 0; i < props.schemes.length; i++) {
      output.push(
        <MiniColorWheel
          colors={props.schemes[i]}
          getColorForSection={props.getColorForSection}
          key={"wheel" + props.schemeName + i}
        />
      );
    }
    return output;
  }
  return (
    <div>
      <div style={{ fontSize: 24, textAlign: "center" }}>
        {props.schemeName}
      </div>
      <div
        style={{
          flexDirection: "row",
          alignContent: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {getColorSchemes()}
      </div>
    </div>
  );
}
export { ColorScheme };

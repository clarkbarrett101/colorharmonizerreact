import React, { useEffect, useRef } from "react";
function MiniColorWheel(props) {
  const canvasRef = useRef(null);
  const height = 200;

  useEffect(() => {
    canvasRef.current.height = height;
    canvasRef.current.width = height;
    const ctx = canvasRef.current.getContext("2d");
    const sections = props.colors.length;
    for (var i = 0; i < sections; i++) {
      var startAngle = -Math.PI / 2 + (i * 2 * Math.PI) / sections;
      var endAngle = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / sections;
      var gradient1 = ctx.createConicGradient(
        startAngle,
        height / 2,
        height / 2
      );
      gradient1.addColorStop(0, props.getColorForSection(props.colors[i], 75));

      gradient1.addColorStop(
        0.5 / sections,
        props.getColorForSection(props.colors[i])
      );
      gradient1.addColorStop(
        1 / sections,
        props.getColorForSection(props.colors[i], 35)
      );

      ctx.fillStyle = gradient1;

      ctx.beginPath();
      ctx.moveTo(height / 2, height / 2);
      ctx.arc(height / 2, height / 2, 75, startAngle, endAngle);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    }
  }, [props.colors, props.getColorForSection]);
  return <canvas ref={canvasRef} />;
}
export { MiniColorWheel };

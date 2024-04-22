import React, { useRef, useEffect, useState } from "react";

function MainColorWheel(props) {
  const numSections = props.numSections;
  const canvasRef = useRef(null);
  const radius =
    Math.min(canvasRef.current?.width, canvasRef.current?.height) / 3;
  const centerX = canvasRef.current?.width / 2;
  const centerY = canvasRef.current?.height / 2;
  const [hoveredSection, setHoveredSection] = useState(null);
  const drawSection = (ctx, index) => {
    let startAngle = (index * 2 * Math.PI) / numSections;
    let endAngle = ((index + 1) * 2 * Math.PI) / numSections;
    if (hoveredSection !== null && index === hoveredSection) {
      ctx.fillStyle = props.getColorForSection(index);
      let expandedRadius = radius * 1.2;
      startAngle = (index * 2 * Math.PI) / numSections;
      endAngle = ((index + 1) * 2 * Math.PI) / numSections;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, expandedRadius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = props.getColorForSection(index);
      ctx.lineWidth = 1;
      ctx.stroke();
    } else {
      try {
        let gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          radius
        );
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.65, props.getColorForSection(index));
        gradient.addColorStop(1, props.getColorForSection(index, 35));
        ctx.fillStyle = gradient;
        ctx.strokeStyle = gradient;
      } catch (e) {
        ctx.fillStyle = props.getColorForSection(index);
        ctx.strokeStyle = props.getColorForSection(index);
      }
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  function highlight(event) {
    const ctx = canvasRef.current.getContext("2d");
    document.body.style.overflow = "hidden";
    var rect = canvasRef.current.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    setHoveredSection(null);
    for (var i = 0; i < numSections; i++) {
      var startAngle = (i * 2 * Math.PI) / numSections;
      var endAngle = ((i + 1) * 2 * Math.PI) / numSections;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, canvasRef.current.width, startAngle, endAngle);
      ctx.closePath();

      if (ctx.isPointInPath(mouseX, mouseY)) {
        setHoveredSection(i);
        break;
      }
    }
  }
  function drawShadows(ctx) {
    if (props.colorA != -1) {
      var startAngle = (props.colorA * 2 * Math.PI) / numSections;
      var endAngle = ((props.colorA + 1) * 2 * Math.PI) / numSections;
      var outerRadius = radius * 1.3;
      ctx.save();
      ctx.fillStyle = props.getColorForSection(props.colorA);
      ctx.shadowColor = "black";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    }

    if (props.colorB != -1) {
      var startAngle = (props.colorB * 2 * Math.PI) / numSections;
      var endAngle = ((props.colorB + 1) * 2 * Math.PI) / numSections;
      var outerRadius = radius * 1.3;
      ctx.fillStyle = props.getColorForSection(props.colorB);
      ctx.shadowColor = "black";
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
  function handleOnClick(event) {
    if (hoveredSection === null) {
      return;
    }
    console.log(props.colorA, props.colorB, hoveredSection);
    if (props.colorA === hoveredSection) {
      props.setColorA(-1);
      return;
    }
    if (props.colorB === hoveredSection) {
      props.setColorB(-1);
      return;
    }
    if (props.colorA === -1) {
      props.setColorA(hoveredSection);
    } else if (props.colorB === -1) {
      props.setColorB(hoveredSection);
    }
  }
  function drawAllSections(ctx) {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    for (let i = 0; i < numSections; i++) {
      drawSection(ctx, i);
    }
    drawShadows(ctx);
    requestAnimationFrame(() => drawAllSections(ctx));
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawAllSections(ctx);
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousemove", highlight);
      canvasRef.current.addEventListener("mouseleave", (event) => {
        setHoveredSection(null);
      });
      canvasRef.current.addEventListener("click", handleOnClick);
    }
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousemove", highlight);
        canvasRef.current.removeEventListener("mouseleave", (event) => {
          setHoveredSection(null);
        });
        canvasRef.current.removeEventListener("click", handleOnClick);
      }
    };
  }, [drawAllSections]);
  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    drawAllSections(ctx);
  }, []);
  const [started, setStarted] = useState(false);
  function start() {
    setStarted(true);
    const ctx = canvasRef.current.getContext("2d");
    drawAllSections(ctx);
  }
  function startButton() {
    if (started) {
      return;
    }
    return (
      <button
        onClick={start}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        Start
      </button>
    );
  }
  return (
    <>
      {startButton()}
      <canvas
        style={{
          height: 500,
          width: 500,
          alignContent: "center",
          justifyContent: "center",
          display: "block",
          margin: "auto",
        }}
        ref={canvasRef}
        width={500}
        height={500}
      />
    </>
  );
}

export { MainColorWheel };

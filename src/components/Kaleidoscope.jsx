import { useState, useEffect } from "react";
import { useGesture } from "@use-gesture/react";

export default function Kaleidoscope(bgImage) {
  // State variables to store mouse positions
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [gridSize, setGridSize] = useState({ numRows: 9, numCols: 5 });

  const maxScale = 1.0;

  const calculateGridSize = () => {
    const newNumRows = window.innerHeight > window.innerWidth ? 9 : 5;
    const newNumCols = window.innerHeight > window.innerWidth ? 5 : 9;
    // console.log(newNumRows, newNumCols);
    return { numRows: newNumRows, numCols: newNumCols };
  };

  useEffect(() => {
    setGridSize(calculateGridSize());

    // const gridContainer = document.getElementById("gridContainer");
    const gridContainer = document.querySelector(".gridContainer");
    // console.log(gridContainer);

    let styles = `
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        display: grid;
        --num-rows: ${gridSize.numRows};
        --num-cols: ${gridSize.numCols};
        grid-template-columns: repeat(${gridSize.numCols},1fr );
        grid-template-rows: repeat(${gridSize.numRows},1fr );
        `;
    gridContainer.style.cssText = styles;

    // Create the squares
    const createSquare = () => {
      const square = document.createElement("div");
      square.classList.add("square");
      gridContainer.appendChild(square);
      return square;
    };

    const squares = Array.from(
      { length: gridSize.numRows * gridSize.numCols },
      createSquare
    );
    bgImage &&
      squares.forEach((square) => {
        square.style.backgroundImage = `url(data:image/svg+xml;base64,${btoa(
          bgImage.bgImage
        )})`;
        square.style.backgroundPosition = "center";
        // square.style.transition = "0.5s ease-out"; //commented out temporarily
        square.style.opacity = "0.6";
      });

    const shiftSquares = (mX, mY, gridW, gridH, tileW, tileH) => {
      mX = mX + gridW / 2;
      mY = mY + gridH / 2;
      squares.forEach((square, index) => {
        const row = Math.floor(index / gridSize.numCols);
        const col = index % gridSize.numCols;
        const xt = remap(col, 0, gridSize.numCols, 0, gridW);
        const yt = remap(row, 0, gridSize.numRows, 0, gridH);
        const distance = Math.sqrt((xt - mX) ** 2 + (yt - mY) ** 2);
        const multiplier = Math.min(
          maxScale,
          maxScale *
            remap(distance, 0, (gridW + gridH) / 4, 3 / Math.sqrt(1.1), 0)
        );

        square.style.width = `${tileW * 1}px`; // instead of 1, use multiplier
        square.style.height = `${tileH * 1}px`; // instead of 1, use multiplier
        square.style.opacity = `${remap(distance, 0, gridW / 2, 1.5, 0.2)}`;

        // Calculate background tiles position based on the square's position

        const bgX = -xt;
        const bgY = -yt;
        square.style.backgroundPosition = `${bgX}px ${bgY}px`;
        square.style.backgroundSize = `${gridW * multiplier}px ${
          gridH * multiplier
        }px`;
        square.style.transform = `translate(${0}px, ${0}px)`;
      });
    };

    const handleTouchMove = (event, mx, my) => {
      // console.log(event.touches[0].clientX, event.touches[0].clientY);
      const gridContainerRect = gridContainer.getBoundingClientRect();
      const tileWidth = gridContainerRect.width / gridSize.numCols;
      const tileHeight = gridContainerRect.height / gridSize.numRows;
      const newMouseX =
        event.touches[0].clientX -
        gridContainerRect.width * 0.5 -
        tileWidth * 0.5;
      const newMouseY =
        event.touches[0].clientY -
        gridContainerRect.height * 0.5 -
        tileHeight * 0.5;
      setMouseX(newMouseX);
      setMouseY(newMouseY);

      shiftSquares(
        newMouseX,
        newMouseY,
        gridContainerRect.width,
        gridContainerRect.height,
        tileWidth,
        tileHeight
      );
    };

    function handleMouseMove(e) {
      const gridContainerRect = gridContainer.getBoundingClientRect();
      const tileWidth = gridContainerRect.width / gridSize.numCols;
      const tileHeight = gridContainerRect.height / gridSize.numRows;
      const newMouseX =
        e.clientX - gridContainerRect.width * 0.5 - tileWidth * 0.5;
      const newMouseY =
        e.clientY - gridContainerRect.height * 0.5 - tileHeight * 0.5;

      setMouseX(newMouseX);
      setMouseY(newMouseY);

      shiftSquares(
        newMouseX,
        newMouseY,
        gridContainerRect.width,
        gridContainerRect.height,
        tileWidth,
        tileHeight
      );
    }

    function handleWindowResize() {
      setGridSize(calculateGridSize());
    }

    window.addEventListener("resize", handleWindowResize);

    // Add the mousemove/touchmove event listener
    //but first check if the device supports touch events

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Add the appropriate event listener
    if (isTouchDevice) {
      // console.log("touch device detected");
      document.addEventListener("touchmove", handleTouchMove);
    } else {
      // console.log("mouse device detected");
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      // Remove the mousemove event listener when component unmounts
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleWindowResize);

      gridContainer.innerHTML = "";
    };
  }, [bgImage, window.innerWidth]);

  // a function to remap a value from one range to another range
  function remap(value, fromLow, fromHigh, toLow, toHigh) {
    return (
      ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow
    );
  }

  return (
    <div
      className="gridContainer"
      id="gridContainer"
      style={{ zIndex: "-100" }}
    ></div>
  );
}

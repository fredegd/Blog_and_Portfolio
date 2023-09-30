import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

import Mona from "../assets/Mona_lisa.jpeg";
import "./About.css";
import anime from "animejs";

const slideIn1 = `
  @keyframes slideIn1 {
    0% {
      transform: translateX(-200%);
      opacity: 0;
    }
    100% {
      transform: translateX(0%);
      opacity: 1;
    }
  }
`;

export default function About() {
  const theme = useTheme();
  const [gridSize, setGridSize] = useState({ numRows: 7, numCols: 1 });
  const [aboutImage, setAboutImage] = useState(Mona);
  //create an array of divs:
  //create a div for each row

  const divArray = Array.from(
    { length: gridSize.numRows },
    (_, index) => index + 1
  );
  console.log(divArray);

  const maxWidth = 30;
  const maxHeight = 45 / gridSize.numRows;
  useEffect(() => {
    anime({
      targets: ".tile",

      translateX: "-1500px",

      delay: anime.stagger(100, { start: 1000 }), // increase delay by 100ms for each elements.
      direction: "reverse",
    });
  }, []);

  return (
    <Box
      id="about"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%",
        minHeight: "100vh",
        overflow: "scroll",
      }}
    >
      {" "}
      <Box
        sx={{
          backgroundColor: theme.palette.text.highlight,
          fontSize: "20px",
          color: theme.palette.text.contrast,
          width: "100%",
          padding: "2.5rem",
          marginY: "5rem",
          zIndex: "1000",
        }}
      >
        <Typography variant="h1">About Me:</Typography>
      </Box>
      <Box
        sx={{
          zIndex:"1000",
          paddingX: "2.5rem",
          display: "flex",
          flexDirection: {xs:"column", md:"row"},
          alignItems: "center",
          width: "100%",
          overflow: "scroll",
          // border: "1px solid black",

          backgroundColor:`${theme.palette.background.main} 1.0`
        }}
      >
         <Box 
         sx={{ padding:"2.5rem" , }}>
          <Typography variant="p" color={theme.palette.text.primary}></Typography>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
          reiciendis dignissimos cupiditate aliquam obcaecati rerum laboriosam
          numquam nam, incidunt debitis corrupti impedit eaque quidem quibusdam
          inventore culpa sequi. Dicta, in?
        </Box>
        <Box >
          {divArray.map((item) => {
            const bgY = -maxHeight * item + maxHeight;
            console.log(item);
            return (
              <Box
                className="tile"
                key={item}
                sx={{
                  position: "relative",
                  background: `url(${aboutImage})`,
                  backgroundPosition: {
                    xs: ` ${-maxWidth * 2}vw ${bgY * 2}vw`,
                    md: ` ${-maxWidth}vw ${bgY}vw`,
                  },
                  filter: "grayscale(50%)",
                  backgroundSize: { xs: "100% auto", md: "100% auto" },
                  backgroundRepeat: "noRepeat",
                  width: { xs: `${maxWidth * 2}vw`, md: `${maxWidth}vw` },
                  height: { xs: `${maxHeight * 2}vw`, md: `${maxHeight}vw` },
                  // border: "1px solid black",
                  // transition: "0.1s ease-out",
                  // animation: `${slideIn1} 1.7s ease-out ${item.id * 0.1}s 1`,
                }}
              ></Box>
            );
          })}
        </Box>
       
      </Box>
    </Box>
  );
}

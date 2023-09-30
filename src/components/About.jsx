import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";

import Pic from "../assets/IMG_4858.jpg";

import anime from "animejs";


export default function About() {
  const theme = useTheme();
  const [gridSize, setGridSize] = useState({ numRows: 20, numCols: 1 });
  const [aboutImage, setAboutImage] = useState(Pic);

  const divArray = Array.from(
    { length: gridSize.numRows },
    (_, index) => index + 1
  );

  const maxWidth = 30;
  const maxHeight = 45 / gridSize.numRows;
 
  const target = document.querySelector(".tile-wrap");

  const handleOn = (entry) => {
    anime({
      targets: ".tile",
      rotate: anime.stagger([-10, 10]), // rotation will be distributed from -360deg to 360deg evenly between all elements
      translateX:[0, "12vw","-85vw"],

      // keyframes: [
      //   {translateX: "-100vw"},

      
      // ],
        


      duration: 1200,
      delay: function(entry, i) { return i * 100; },

       delay: anime.stagger(100, {direction: 'reverse'}),
      direction: "reverse",
    });

  };


  function handleIntersection(entries) {
    // The callback will return an array of entries, even if you are only observing a single item
    entries.map((entry) => {
      if (entry.isIntersecting) {
        console.log("intersecting");

       handleOn(entry)
      //  
     } else{
      console.log("not intersecting");
     }
    });
  }


  const observer = new IntersectionObserver(handleIntersection);

  target && observer.observe(target);


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
          color: theme.palette.text.primary,
          width: "100%",
          padding: "2.5rem",
          marginY: "5rem",
          zIndex: "1000",
        }}
      >
        <Typography variant="h1" >About Me:</Typography>
      </Box>
      <Box
      className="tile-wrap"
        sx={{
          zIndex: "1000",
          padding: "2.5rem",
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          width: "100%",
          overflow: "scroll",
          // border: "1px solid black",

          backgroundColor: `${theme.palette.background.main}`,
        }}
      >
        <Box className="tile" sx={{ padding: "2.5rem" }} >

          <Typography
            variant="p"
            color={theme.palette.text.primary}
          ></Typography>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
          reiciendis dignissimos cupiditate aliquam obcaecati rerum laboriosam
          numquam nam, incidunt debitis corrupti impedit eaque quidem quibusdam
          inventore culpa sequi. Dicta, in?
        </Box>
        <Box 
        >
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
                  filter: "brightness(130%)",
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

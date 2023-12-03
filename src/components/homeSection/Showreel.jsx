import * as React from "react";
import Box from "@mui/joy/Box";
import { Card } from "@mui/material";
import { useTheme } from "@emotion/react";
import { motion } from "framer-motion";
import { useAnimateOnScroll } from "../shared/UseAnimateOnScroll";



export default function Showreel() {
  const theme = useTheme();
  const { parentRef, control } = useAnimateOnScroll(0);
  console.log(parentRef, control);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "67vw", sm: "58vw", lg: "52vw", xl: "43vw" },
        width: "100%",
        maxWidth: "100%",
        background: "transparent",
        backgroundColor: `${theme.palette.background.main}cc`,


        zIndex: 1000,
      }}
    >
      <motion.div
        ref={parentRef}
        initial="hidden" // Set initial animation state
        animate={control} // Use control to manage animation states
        transition={{ duration: 0.5, ease: "easeOut" }} // Define the duration and delay for the animation
        variants={{
          visible: {

            opacity: 1,
            transition: { duration: 1.2, ease: "easeInOut" },
          },
          hidden: {

            opacity: 0.01,
            transition: { duration: 1.2, ease: "easeInOut" },
          },
        }}
      >
        {/* Your content goes here */}
        <Card sx={{ minWidth: 300, flexGrow: 1 }}>
          <video
            autoPlay
            loop
            muted
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "translate(-50%, -50%)",
            }}
            // poster="https://assets.codepen.io/6093409/river.jpg"
          >
            <source
              src="./src/assets/video.mp4"
              type="video/mp4"
              onLoad={() => console.log("video")}
            />
          </video>
        </Card>
      </motion.div>
      {/* Other content */}
    </Box>
  );
}

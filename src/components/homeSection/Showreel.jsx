import * as React from "react";
import Box from "@mui/joy/Box";
import { Card, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { motion } from "framer-motion";
import { useAnimateOnScroll } from "../shared/UseAnimateOnScroll";
import { useEffect, useState } from "react";
import { contentfulClient } from "../../utils/contentfulClient";

export default function Showreel() {
  const [showReelUrl, setShowReelUrl] = useState(null);

  useEffect(() => {
    contentfulClient
      .getEntry(import.meta.env.VITE_INTRO_SHOW_REEL_ID)
      .then((response) => {
        setShowReelUrl(response.fields.showReel.fields.file.url);
      })
      .catch((err) => console.log(err));
  }, []);

  const theme = useTheme();
  const { parentRef, control } = useAnimateOnScroll(0);

  return (
    <>
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
          marginBottom: "10rem",
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
              transition: { duration: 0.7, ease: "easeInOut" },
            },
            hidden: {
              opacity: 0,
              transition: { duration: 0.7, ease: "easeInOut" },
            },
          }}
        >
          {/* Your content goes here */}
          <Card sx={{ minWidth: 300, flexGrow: 1 }}>
            {showReelUrl ? (
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
                <source src={showReelUrl} type="video/mp4" />
              </video>
            ) : null}
          </Card>
          <Box
            sx={{
              position: "relative",
              bottom: { xs: "-35vw", sm: "-30vw", lg: "-26.5vw", xl: "-22vw" },
              width: "100vw",
              maxWidth: "1280px",
              display: "flex",
              justifyContent: "flexStart",
            }}
          >
            <Typography
              variant="p"
              sx={{
                minWidth: "100%",
                textAlign: "left",
                fontSize: { xs: "1rem" },
              }}
            >
              {" "}
              showreel 2022/2023
            </Typography>
          </Box>
        </motion.div>
        {/* Other content */}
      </Box>
    </>
  );
}

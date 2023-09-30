import { Box, Grid, Icon, Typography, IconButton, Link } from "@mui/material";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const staggerConfig = {
  animate: {
    // scale: [1,0.5, 1],
    // rotate: [0, 360],
    opacity: [1, 1, 0.5],
  },
  transition: {
    duration: 1,
    ease: "easeIn",
    times: [0, 0.5, 1],
    repeat: Infinity,
  },
};


export default function Contact() {
  const theme = useTheme();

  const [click, setClick] = useState(false);
  const clicker = () => {
    return click ? setClick(false) : setClick(true);
  };
  console.log("click", click);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("animate");
  }, [clicker]);

  return (
    <Box
      sx={{
        height: "30vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: { xs: "flex-start", sm: "flex-start" },
        paddingTop: "5rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.text.highlight,
          backgroundBlendMode: "difference",
          fontSize: "20px",
          color: theme.palette.text.contrast,
          marginY: "5rem",
          width: "100%",
          padding: "2.5rem",
          // marginTop: "5rem",
          zIndex: "1000",
        }}
      >
        <Typography variant="p" color={theme.palette.text.primary}>
          2023 all rights reserved © Fred Egidi
        </Typography>
      </Box>
     
    </Box>
  );
}

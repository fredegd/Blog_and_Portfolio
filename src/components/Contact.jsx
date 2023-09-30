import { Box, Grid, Icon, Typography, IconButton, Link } from "@mui/material";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import contactItems from "../contactItems";

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

  const controls = useAnimation();

  useEffect(() => {
    controls.start("animate");
  }, [clicker]);

  return (
    <Box
    id="contact"
      sx={{
        height: {xs:"70vh",sm:"80vh",md:"60vh"},
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
          backgroundColor: `${theme.palette.text.highlight}88`,
          fontSize: "20px",
          color: theme.palette.text.primary,
          marginBottom: "5rem",
          width: "100%",
          padding: "2.5rem",
          // marginTop: "5rem",
          zIndex: "1000",
        }}
      >
        <Typography variant= "h1" sx={{fontSize:{xs:"2rem",sm:"2.5rem", md:"3rem", lg:"4rem"}}}>Let´s get in Touch:</Typography>
      </Box>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{
          "& > div": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        {contactItems.map((item) => {
          return (
            <Grid item key={item.id} xs={6} sm={6} md={3}>
              <Link href={item.linkTo} target={"blank"} underline="hover">
                <motion.div
                  key={item.id}
                  style={{
                    margin: "1rem",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  variants={staggerConfig}
                  // initial="animate"
                  //  animate={controls}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    sx={{
                      background: theme.palette.background.main,
                      border: `10px solid ${theme.palette.text.highlightAlt}`,
                      color: theme.palette.text.highlightAlt,
                      borderRadius: "10%",
                      width: {
                        xs: "100px",
                        sm: "200px",
                        md: "180px",
                        lg: "150px",
                      },
                      height: {
                        xs: "100px",
                        sm: "200px",
                        md: "180px",
                        lg: "150px",
                      },
                      transition: "all 0.5s ease-in-out",
                      "&:hover": {
                        color: theme.palette.text.highlight,
                        background: theme.palette.background.main,
                      },
                      fontSize: {
                        xs: "4rem",
                        sm: "8rem",
                        md: "9rem",
                        lg: "8rem",
                      },
                    }}
                  >
                    <item.icon
                      style={{
                        fontSize: "inherit",
                        textAlign: "center",
                        textJustify: "center",
                      }}
                    />
                  </IconButton>
                  <Box sx={{zIndex:"1000", }}>
                    <Typography variant="h6"  textDecoration={"none"}>{item.id}</Typography>
                  </Box>
                </motion.div>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

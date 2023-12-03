import { useEffect, useState } from "react";
import { Box, Grid, Typography, IconButton, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import contactItems from "../../contactItems";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";

import { motion, useAnimation } from "framer-motion";

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

export default function SocialContacts() {
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
      sx={{
        width: { xs: "100%", lg: "50%" },
        height: "35rem",
        boxShadow: `0 0 10px ${theme.palette.text.highlightAlt}}`,
      }}
    >
      <Box display={"flex"} justifyContent={"center"}>
        <Typography variant="h3" my={3} mx={2}>
          <HandshakeOutlinedIcon sx={{ fontSize: "3rem" }} />
        </Typography>
        <Typography variant="h5" my={3}>
          Socials:
        </Typography>
      </Box>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        mb={5}
         py={"0.5rem"}
      >
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            maxWidth: "900px",
            // paddingX: { xs: "2rem", md: "2.5rem" },
            "& > div": {
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          {contactItems.map((item) => {
            // console.log(item.icon)
            return (
              <Grid item key={item.id} xs={6} md={6} lg={6}>
                <Link href={item.linkTo} target={"blank"} underline="hover">
                  <motion.div
                    key={item.id}
                    style={{
                      margin: "0 1.5rem 0 1.5rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    variants={staggerConfig}
                    // initial="animate"
                    //  animate={controls}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 8 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconButton
                      sx={{
                        fill: `${theme.palette.text.highlightAlt} `,
                        background: theme.palette.background.main,
                        border: `10px solid ${theme.palette.text.highlightAlt}`,
                        color: theme.palette.text.highlightAlt,
                        borderRadius: "1.5rem",
                        width: {
                          xs: "150px",
                        },
                        height: {
                          xs: "150px",
                        },
                        transition: " 0.4s ease-in-out",
                        "&:hover": {
                          fill: `${theme.palette.text.highlight} `,
                          color: theme.palette.text.highlight,
                          background: theme.palette.background.main,
                          border: `10px solid ${theme.palette.text.highlight}`,
                          borderRadius: "2.2rem",
                        },
                      }}
                    >
                      <Typography variant="h1" sx={{ display: "flex" }}>
                        {
                          <item.icon
                            sx={{
                              fontSize: {
                                xs: "7rem",
                                // sm: "8rem",
                                // md: "8rem",
                                // lg: "8rem",
                              },
                              viewBox: "0 0 512 512",
                              color: "inherit",
                              textAlign: "center",
                              textJustify: "center",
                            }}
                          />
                        }
                      </Typography>
                    </IconButton>
                    <Box
                      sx={{
                        zIndex: "1000",
                      }}
                    >
                      <Typography
                        variant="h6"
                        textDecoration={"none"}
                        color={theme.palette.text.primary}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </motion.div>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

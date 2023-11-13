import * as React from "react";
import { useState, useEffect } from "react";
import {Box, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Artwork from "./Artwork";

export default function DrawerBGChange({
  bgImage,
  setBgImage,
  open,
  setOpen,
  color1,
  color2,
  setColor1,
  setColor2,
  staticBg,
  setStaticBg
}) {
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  const theme = useTheme(); 

  return (
    <Drawer
      anchor={"left"}
      open={open}
      onClose={toggleDrawer(false)}
      variant="persistent"
      style={{ zIndex: "1000" }}
    >
      <Box
        sx={{
          width: {
            sm: "400px", // 400px wide on screens wider than 600px (md)
            xs: "100vw", // Fullscreen on small screens
          },
          height: "100vh",

          display: "flex",
          flexDirection: "column",
        }}
        role="presentation"
      >
       
        <IconButton
            aria-label="close drawer"
            edge="start"
            onClick={closeDrawer}
            sx={{
              color: theme.palette.text.primary,
              alignSelf: "flex-end",

            }}
          >
            <Typography
              variant={"h6"}
              sx={{ display: "flex" }}
            >
              <CloseIcon sx={{ fontSize: { xs: "2.2rem", sm: "2rem" } }} />
            </Typography>
          </IconButton>

        <Artwork
          bgImage={bgImage}
          setBgImage={setBgImage}
          color1={color1}
          color2={color2}
          setColor1={setColor1}
          setColor2={setColor2}
          staticBg={staticBg}
          setStaticBg={setStaticBg}
        />
      </Box>
    </Drawer>
  );
}

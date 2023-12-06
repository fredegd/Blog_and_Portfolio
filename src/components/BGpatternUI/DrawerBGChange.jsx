import { useDarkMode } from "../../context/DarkModeContext";
import { Box, IconButton, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { CustomSwitch } from "./CustomSwitch";

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
  setStaticBg,
}) {
  const theme = useTheme();

  const { dk, toggleDarkMode } = useDarkMode();

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  const handleDarkChange = () => {
    toggleDarkMode();
  };

  const dkToggleIcon = (
    <IconButton
      aria-label="dark-light-toggle"
      edge="start"
      onClick={handleDarkChange}
      sx={{
        color: theme.palette.text.primary,
        mx: "0.8rem",
        width: { xs: "1.6rem", sm: "1.6rem" },
        height: { xs: "1.6rem", sm: "1.6rem" },
        "&:hover": {
          border: `1px solid ${theme.palette.text.highlight}`,
          boxShadow: ` 0px 0px 5px 5px ${theme.palette.text.highlight}aa , inset 0px 0px 2.0px 2.0px ${theme.palette.text.highlight}aa`,
          color: theme.palette.text.highlightAlt,
        },
      }}
    >
      <Typography variant={"h6"} sx={{ display: "flex" }}>
        {dk ? (
          <LightModeIcon sx={{ fontSize: { xs: "2.4rem", sm: "2.2rem" } }} />
        ) : (
          <DarkModeIcon sx={{ fontSize: { xs: "2.4rem", sm: "2.2rem" } }} />
        )}
      </Typography>
    </IconButton>
  );

  return (
    <Drawer
      anchor={"right"}
      open={open}
      onClose={toggleDrawer(false)}
      variant="persistent"
      style={{ zIndex: "1000" }}

    >
      <Box
        sx={{
          width: {
            xs: "100vw", // Fullscreen on small screens
            sm: "400px", // 400px wide on screens wider than 400px (md)
          },
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: theme.palette.background.main + "88",
        }}
        role="presentation"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <LightModeIcon sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem" } }} />
            <CustomSwitch checked={dk} onChange={handleDarkChange} />
            <DarkModeIcon sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem" } }} />
          </Box>

          <IconButton
            aria-label="close drawer"
            edge="start"
            onClick={closeDrawer}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant={"h6"} sx={{ display: "flex" }}>
              <CloseIcon sx={{ fontSize: { xs: "2.2rem", sm: "2rem" } }} />
            </Typography>
          </IconButton>
        </Box>
        <Typography
          variant="p"
          sx={{
            fontSize: { xs: 18, md: 18 },
            fontWeight: "bold",
            padding: "0.5rem",
          }}
        >
          {" "}
          Tap below to Generate a new Background Pattern
        </Typography>
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

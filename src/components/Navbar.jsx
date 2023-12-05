import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDarkMode } from "../context/DarkModeContext";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Typewriter from "typewriter-effect";
import {
  Box,
  Button,
  useScrollTrigger,
  Drawer,
  IconButton,
  List,
  ListItem,
  Link,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material/";
import { motion, useScroll } from "framer-motion";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import { navItems } from "../navItems";
import animatedLogoBW from "../assets/animatedLogoBW.gif";
import animatedLogoWB from "../assets/animatedLogoWB.gif";
import anime from "animejs";

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar({ window, setOpen }) {
  const { dk, toggleDarkMode } = useDarkMode();
  const theme = useTheme();
  const { scrollYProgress } = useScroll();

  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  useEffect(() => {
    // Iterate through the navItems to find the active one
    for (const item of navItems) {
      if (
        location.pathname.slice(1, location.pathname.length).startsWith(item.id)
      ) {
        setActiveMenuItem(item.id);
        return;
      } else if (location.pathname === "/") {
        setActiveMenuItem(item.id);
        return;
      }
    }
    // If no match is found, set activeMenuItem to null
    setActiveMenuItem(null);
  }, [location.pathname]);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDrawerBgChange = () => {
    setMobileOpen(false);
    setOpen((prevState) => !prevState);
  };

  const handleDarkChange = () => {
    toggleDarkMode();
  };

  // anime({
  //   targets: ".menu-logo",
  //   translateX: ["70vw", 0],

  //   opacity: [0.5, 1],
  //   duration: 850,

  //   delay: anime.stagger(250, { direction: "reverse" }),
  //   easing: "easeOutElastic(1, .8)",
  // });

  // anime({
  //   targets: ".close-drawer",
  //   translateX: ["-20vw", 0],

  //   opacity: [0.5, 1],
  //   duration: 850,

  //   delay: anime.stagger(350, { direction: "reverse" }),
  //   easing: "easeOutElastic(1, .8)",
  // });

  // anime({
  //   targets: ".link-item ",
  //   translateX: ["90vw", 0],

  //   opacity: [0.5, 1],
  //   duration: (navItems.length + 1) * 150,

  //   delay: anime.stagger(150),
  //   easing: "easeOutElastic(1, .8)",
  // });
  const BGoptionsUIIcon = (
    <IconButton
      aria-label="openBackgroudEditor"
      edge="start"
      onClick={handleDrawerBgChange}
      sx={{
        color: theme.palette.text.primary,
        mx: "0.8rem",
        width: { xs: "1.6rem", sm: "1.6rem" },
        height: { xs: "1.6rem", sm: "1.6rem" },
        padding: 0,
        // borderRadius: "50%",
        alignItems: "center",
        "&:hover": {
          boxShadow: ` -0px 0px 5px 5px ${theme.palette.text.highlight}aa , inset 0px 0px 5.0px 5.0px ${theme.palette.text.highlight}aa`,
          color: theme.palette.text.highlightAlt,
        },
      }}
    >
      <Typography variant={"h6"} sx={{ display: "flex" }}>
        <SettingsIcon sx={{ fontSize: { xs: "2.4rem", sm: "2.2rem" } }} />
      </Typography>
    </IconButton>
  );

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
  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box>
        <Box
          className="drawer-header"
          sx={{
            width: "95vw",
            p: "0.5rem",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href={"/"}>
            <Box
              className="menu-logo"
              sx={{
                height: { xs: "2.5rem", sm: "2.2rem" },
                width: { xs: "2.5rem", sm: "2.2rem" },
                backgroundImage: `url(${dk ? animatedLogoWB : animatedLogoBW})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                borderBottom: `3px solid ${theme.palette.text.highlight}`,
                // borderLeft: `3px solid ${theme.palette.text.highlight}`,
                "&:hover": {
                  boxShadow: `0px 0px 2px 2px ${theme.palette.text.highlight}`,
                },
              }}
            />
          </Link>

          <Box>
            {BGoptionsUIIcon}
            {dkToggleIcon}
          </Box>

          <IconButton
            aria-label="close drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
              color: theme.palette.text.primary,
            }}
          >
            <Typography
              variant={"h6"}
              sx={{ display: "flex" }}
              className="close-drawer"
            >
              <CloseIcon sx={{ fontSize: { xs: "2.2rem", sm: "2rem" } }} />
            </Typography>
          </IconButton>
        </Box>

        <Box className="drawer-links">
          <List
            sx={{
              pt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "0.5rem",
            }}
          >
            {navItems.map((item,index) => (
              <ListItem
                className="link-item"
                key={item.id}
                disablePadding
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Link href={item.linkTo} underline="hover">
                  <Button
                    onClick={handleDrawerToggle}
                    sx={{
                      height: "5rem",
                      paddingX: "3rem",
                      marginBottom: "0.5rem",

                      color: theme.palette.text.primary,
                      borderBottom: `4px solid ${
                        activeMenuItem === item.id
                          ? theme.palette.text.highlight
                          : "transparent"
                      }`,
                      // borderLeft: `4px solid ${
                      //   activeMenuItem === item.id
                      //     ? theme.palette.text.highlight
                      //     : "transparent"
                      // }`,

                      "&:hover": {
                        paddingX: "4rem",

                        backgroundColor: `${theme.palette.text.highlightAlt}`,
                      },
                    }}
                  >
                    {/* <Typography variant="h4" sx={{ my: 2 }}>
                      {item.name}{" "}
                    </Typography> */}
                    <Typography
                      variant="h4"
                      sx={{
                        // fontSize: {
                        //   xs: "2.0em",
                        //   sm: "2.2em",
                        //   md: "2.3em",
                        //   lg: "2.3em",
                        //   xl: "2.3em",
                        // },
                        my: 2,
                      }}
                    >
                     {mobileOpen&& <Typewriter
                        options={{
                          delay: 70,
                          deleteSpeed: 20,
                          cursor: "",
                        }}
                        onInit={(typewriter) => {
                          typewriter
                          .start()
                          
                          .pauseFor(300*index)

                            .typeString(item.name)
                        }}
                      />}
                    </Typography>
                  </Button>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box className="drawer-footer" my={3} width={"100vw"}>
        <Typography
          variant="p"
          color={theme.palette.text.secondary}
          fontSize={20}
        >
          all rights reserved © 2023
        </Typography>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <HideOnScroll>
        <AppBar component="nav">
          <Toolbar
            sx={{
              backgroundColor: theme.palette.background.main,
              height: "5rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              // border : `1px solid ${theme.palette.text.highlightAlt}`,
              boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.2)",
            }}
          >
            <Link href={"/"}>
              <Box
                sx={{
                  height: { xs: "2.5rem", md: "3rem" },
                  width: { xs: "2.5rem", md: "3rem" },
                  backgroundImage: `url(${
                    dk ? animatedLogoWB : animatedLogoBW
                  })`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  borderBottom: `3px solid ${theme.palette.text.highlight}`,
                  // borderLeft: `3px solid ${theme.palette.text.highlight}`,

                  "&:hover": {
                    boxShadow: `0px 0px 2px 2px ${theme.palette.text.highlight}`,
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              />
            </Link>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                {navItems.map((item) => (
                  <Link key={item.id} href={item.linkTo} underline="hover">
                    <Button
                      sx={{
                        height: { sm: "3rem", md: "3rem" },

                        // borderRadius: { sm: "1.5rem", md: "1.75rem" },
                        padding: { sm: "0.25rem ", md: "0.95rem" },
                        mx: { sm: "0.1rem", md: "0.7rem" },
                        fontSize: { sm: "1.15rem", md: "1.4rem" },
                        letterSpacing: { sm: "-0.055rem", md: "0.065rem" },
                        color: theme.palette.text.primary,
                        borderBottom: `4px solid ${
                          activeMenuItem === item.id
                            ? theme.palette.text.highlight
                            : "transparent" // Inactive color
                        }`,
                        // borderLeft: `4px solid ${
                        //   activeMenuItem === item.id
                        //     ? theme.palette.text.highlight
                        //     : "transparent"
                        // }`,

                        "&:hover": {
                          backgroundColor: `${theme.palette.text.highlightAlt}`,
                          // boxShadow: `0px 0px 5px 5px ${theme.palette.text.highlight}`,
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "flex" }}>
              {BGoptionsUIIcon}
              {dkToggleIcon}
            </Box>

            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { md: "none" },
                color: theme.palette.text.primary,
              }}
            >
              <Typography variant={"h6"} sx={{ display: "flex" }}>
                <MenuIcon sx={{ fontSize: { xs: "2.2rem", sm: "2rem" } }} />
              </Typography>
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Box component="nav">
        <Drawer
          anchor={"right"}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            height: "100vh",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

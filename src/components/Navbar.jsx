import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDarkMode } from "../context/DarkModeContext";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";

import MenuIcon from "@mui/icons-material/Menu";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { navItems } from "../navItems";
import animatedLogo from "../assets/animatedLogo.gif";

// const drawerWidth = 240;

export default function Navbar({ window, setOpen }) {
  const { dk, toggleDarkMode } = useDarkMode();
  const theme = useTheme();

  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  // console.log(activeMenuItem);

  useEffect(() => {
    // Iterate through the navItems to find the active one
    for (const item of navItems) {
      if (
        location.pathname.slice(1, location.pathname.length).startsWith(item.id)
      ) {
        setActiveMenuItem(item.id);
        return; // Exit the loop early when found
      } else if (location.pathname === "/") {
        setActiveMenuItem(item.id);
        return;
      }
    }
    // If no match is found, set activeMenuItem to null
    setActiveMenuItem(null);
  }, [location.pathname]);

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleDrawerBgChange = () => {
    setOpen((prevState) => !prevState);
  };

  const handleDarkChange = () => {
    toggleDarkMode();
  };

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
          <Link href={"/"} underline="hover">
            <Box
              onClick={handleDrawerToggle}
              sx={{
                height: { xs: "3.5rem", sm: "4rem" },
                width: { xs: "3.5rem", sm: "4rem" },
                backgroundImage: `url(${animatedLogo})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                borderRadius: "50%",
                borderBottom: `3px solid ${theme.palette.text.highlight}`,
                borderLeft: `3px solid ${theme.palette.text.highlight}`,
              }}
            />
          </Link>

          <IconButton
            aria-label="close drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none" },
              color: theme.palette.text.primary,
            }}
          >
            <Typography variant={"h6"} sx={{ display: "flex" }}>
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
            {navItems.map((item) => (
              <ListItem
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
                      borderRadius: "2.5rem",
                      width:"70vw",
                      // color:
                      //   activeMenuItem === item.id
                      //     ? theme.palette.text.contrast // Active color
                      //     : theme.palette.text.primary, // Inactive color
                      borderBottom: `4px solid ${
                        activeMenuItem === item.id
                          ? theme.palette.text.highlight
                          : "transparent"
                      }`,
                      borderLeft: `4px solid ${
                        activeMenuItem === item.id
                          ? theme.palette.text.highlight
                          : "transparent"
                      }`,

                      "&:hover": {
                        backgroundColor: `${theme.palette.text.highlightAlt}`,
                        boxShadow: `0px 0px 5px 5px ${theme.palette.text.highlight}`,
                      },
                    }}
                  >
                    <Typography variant="h4" sx={{ my: 2 }}>
                      {item.name}{" "}
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

          <Link href={"/"} underline="hover">
            <Box
              sx={{
                height: { xs: "3.5rem", sm: "3.5rem" },
                width: { xs: "3.5rem", sm: "3.5rem" },
                backgroundImage: `url(${animatedLogo})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                borderRadius: "50%",
                borderBottom: `3px solid ${theme.palette.text.highlight}`,
                borderLeft: `3px solid ${theme.palette.text.highlight}`,
                "&:hover": {
                  boxShadow: `0px 0px 5px 5px ${theme.palette.text.highlight}`,
                },
                transition: "all 0.2s ease-in-out",
              }}
            />
          </Link>

          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {navItems.map((item) => (
                <Link key={item.id} href={item.linkTo} underline="hover">
                  <Button
                    sx={{
                      height: { sm: "3rem", md: "3rem" },

                      borderRadius: { sm: "1.5rem", md: "1.75rem" },
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
                      borderLeft: `4px solid ${
                        activeMenuItem === item.id
                          ? theme.palette.text.highlight
                          : "transparent"
                      }`,

                      "&:hover": {
                        backgroundColor: `${theme.palette.text.highlightAlt}`,
                        boxShadow: `0px 0px 5px 5px ${theme.palette.text.highlight}`,
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </Box>

            <IconButton
              aria-label="openBackgroudEditor"
              edge="start"
              onClick={handleDrawerBgChange}
              sx={{
                color: theme.palette.text.highlight,
                mx: "0.8rem",
                width: { xs: "1.6rem", sm: "1.6rem" },
                height: { xs: "1.6rem", sm: "1.6rem" },
                padding: 0,
                borderRadius: "10%",
                "&:hover": {
                  boxShadow: `0px 0px 10px 10px ${theme.palette.text.highlightAlt}`,
                },
              }}
            >
              <Typography variant={"h6"} sx={{ display: "flex" }}>
                <WallpaperIcon
                  sx={{ fontSize: { xs: "2.2rem", sm: "2rem" } }}
                />
              </Typography>
            </IconButton>

            <IconButton
              aria-label="openBackgroudEditor"
              edge="start"
              onClick={handleDarkChange}
              sx={{
                color: theme.palette.text.primary,
                mx: "0.8rem",
                width: { xs: "1.6rem", sm: "1.6rem" },
                height: { xs: "1.6rem", sm: "1.6rem" },
                "&:hover": {
                  boxShadow: ` 0px 0px 8px 8px ${theme.palette.text.highlight} , inset 0px 0px 2.5px 2.5px ${theme.palette.text.highlight}`,
                },
              }}
            >
              <Typography variant={"h6"} sx={{ display: "flex" }}>
                {dk ? (
                  <DarkModeIcon
                    sx={{ fontSize: { xs: "2.2rem", sm: "2rem" } }}
                  />
                ) : (
                  <LightModeIcon
                    sx={{ fontSize: { xs: "2.2rem", sm: "2rem" } }}
                  />
                )}
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
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

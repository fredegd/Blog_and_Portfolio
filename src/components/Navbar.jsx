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
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { navItems } from "../navItems";
import { Link as Scroller } from "react-scroll";

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
      // console.log(location.pathname.slice(1,location.pathname.length) )
      //  console.log(location.pathname.startsWith(item.linkTo.slice(1,item.linkTo.length)))

      // if (location.pathname === item.linkTo) {
      //   setActiveMenuItem(item.id);
      //   return; // Exit the loop early when found
      // }
      //   console.log(location.pathname.slice(1, location.pathname.length));
      // console.log(location.pathname);

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
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        width: {
          sm: "400px", // 400px wide on screens wider than 600px (md)
          xs: "100vw", // Fullscreen on small screens
        },
        height: "90vh",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: theme.palette.text.highlight, my: 2, maxHeight: "5vh" }}
      >
        Fred Egidi
      </Typography>
      <Divider />
      <List
        sx={{
          height: "75vh",
          mt: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
            <Scroller
              activeClass="active"
              to={item.linkTo}
              smooth={true}
              offset={-410}
              duration={200}
              delay={100}
              isDynamic={true}
            >
              {/* <Link href={item.linkTo} underline="hover"> */}
              <Button
                key={item.id}
                sx={{
                  color:
                    activeMenuItem === item.id
                      ? theme.palette.text.highlightAlt // Active color
                      : theme.palette.text.primary, // Inactive color
                  backgroundColor:
                    activeMenuItem === item.id
                      ? theme.palette.text.primary
                      : "transparent",

                  width: "100vw",
                }}
              >
                <Typography variant="h4" sx={{ my: 2, maxHeight: "5vh" }}>
                  {item.name}{" "}
                </Typography>
              </Button>
              {/* </Link> */}
            </Scroller>
          </ListItem>
        ))}
      </List>

      <Box mt={8}>
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
              display: { sm: "none" },
              color: theme.palette.text.primary,
            }}
          >
            <MenuIcon />
          </IconButton>

          <Link href={"/"} underline="hover">
            <Typography
              variant="h6"
              component="div"
              color={theme.palette.text.primary}
              fontFamily={"IBM Plex Mono"}
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                color: theme.palette.text.highlight,
              }}
              textAlign="left"
            >
              Fred Egidi
            </Typography>
          </Link>

          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Scroller
                key={item.id}
                  activeClass="active"
                  to={item.scrollTo? item.scrollTo:item.linkTo}
                  smooth={true}
                  offset={-110}
                  duration={1200}
                  delay={100}
                  isDynamic={true}
                >
                  <Button
                    sx={{
                      color:
                        activeMenuItem === item.id
                          ? theme.palette.text.contrast // Active color
                          : theme.palette.text.primary, // Inactive color
                      backgroundColor:
                        activeMenuItem === item.id
                          ? theme.palette.text.highlight
                          : "transparent",
                    }}
                  >
                    {item.name}
                  </Button>
                </Scroller>
              ))}
            </Box>

            <Box
              onClick={handleDrawerBgChange}
              sx={{ color: theme.palette.text.highlight, mx: 2 }}
            >
              <WallpaperIcon />
            </Box>

            <Box
              onClick={handleDarkChange}
              style={{ color: theme.palette.text.primary, mx: 2 }}
            >
              {dk ? <DarkModeIcon /> : <LightModeIcon />}
            </Box>
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
            display: { xs: "block", sm: "none" },
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

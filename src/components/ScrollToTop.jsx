import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material";



export default function ScrollToTop() {
  const theme = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);




  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 350,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 ,zIndex: "1100",}}
      >
        <IconButton
            id="back to top"
          
            sx={{

              position: "fixed",
              bottom: "1.5rem",
              right: "1.5rem",
              backgroundColor: theme.palette.text.highlightAlt,
              color: theme.palette.primary.contrastText,
              "&:hover": { backgroundColor: theme.palette.text.primary },
            }}
            // onMouseEnter={handlePopoverOpen}
            // onMouseLeave={handlePopoverClose}
          >
          <KeyboardArrowUpIcon />
          </IconButton>
      </Box>
    </Fade>
  );
}

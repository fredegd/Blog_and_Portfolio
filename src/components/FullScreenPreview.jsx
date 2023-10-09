import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenPreview({
  openPreview,
  setOpenPreview,
  image,
  title,
  description
}) {


  const handleClose = () => {
    setOpenPreview(false);
  };

  return (
    <Box>
      <Dialog
        fullScreen
        open={openPreview}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="Box">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center", alignItems:"center" , p:{xs:"0.5rem", md: "2rem"}}} onClick={handleClose}>

        <img src={image} alt={title} width={"90%"}/>
        <Typography variant="p"sx={{ width:{xs:"100%",md:"90%"} ,textAlign:"justify"}}  > {description}</Typography>
        </Box>
      </Dialog>
    </Box>
  );
}

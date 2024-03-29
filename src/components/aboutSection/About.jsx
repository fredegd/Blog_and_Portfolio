import { Box, Typography, Button } from "@mui/material";

import AboutContentNoAni from "./AboutContentNoAni";
import Footer from "../shared/Footer";

export default function About() {
  window.scrollTo(0, 0);

  return (
    <Box
      id="about"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        minHeight: "100vh",
        zIndex: "1000",
      }}
    >
      <AboutContentNoAni />
      <Footer />
    </Box>
  );
}

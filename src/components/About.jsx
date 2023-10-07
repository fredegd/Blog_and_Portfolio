import { Box, Typography, Button } from "@mui/material";

import AboutContent from "./AboutContent";
import Footer from "./Footer";

export default function About() {
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
      <AboutContent />
      <Footer />
    </Box>
  );
}

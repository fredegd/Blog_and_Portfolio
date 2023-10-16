import { Box } from "@mui/material";
import Hero from "./Hero";

import AboutContent from "./AboutContent";
import BlogPreview from "./BlogPreview";
import ContactContent from "./ContactContent";
import Footer from "./Footer";
export default function Landing({ blogs }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        height: "auto",
        overflow: "scroll",
        background: "transparent",
      }}
    >
      <Hero />
      <AboutContent />
      <BlogPreview blogs={blogs} />
      <ContactContent />
      <Footer />
    </Box>
  );
}

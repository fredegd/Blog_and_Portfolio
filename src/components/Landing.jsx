import Hero from "./Hero";
import AboutContent from "./AboutContent";
import ContactContent from "./ContactContent";
import Footer from "./Footer";
import { Box } from "@mui/material";
import BlogPreview from "./BlogPreview";
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

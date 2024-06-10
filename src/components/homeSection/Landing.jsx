import { Box } from "@mui/material";
import Hero from "./Hero";
import AboutContentNoAni from "../aboutSection/AboutContentNoAni";
// import BlogPreview from "./BlogPreview";
import ContactContent from "../contactSection/ContactContent";
import Footer from "../shared/Footer";
import Showreel from "./Showreel";
import WorksPreview from "./WorksPreview";

// eslint-disable-next-line react/prop-types
export default function Landing({  works }) {
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
      <Showreel />
      <WorksPreview works={works} />
      {/* <BlogPreview blogs={blogs} /> */}
      <AboutContentNoAni />
      <ContactContent />
      <Footer />
    </Box>
  );
}

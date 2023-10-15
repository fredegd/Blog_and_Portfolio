import { Box } from "@mui/material";
import ContactContent from "./ContactContent";
import Footer from "./Footer";
import ProjectsContent from "./ProjectsContent";

export default function Projects() {
  window.scrollTo(0, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "100vh",
        overflow: "scroll",
        zIndex: "1000",
      }}
    >
      <ProjectsContent />
      <Footer />
    </Box>
  );
}

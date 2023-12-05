import { Box } from "@mui/material";
import PageTitle from "../shared/PageTitle";
import ProjectsList from "./ProjectsList";
import Footer from "../shared/Footer";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          zIndex: "1000",
          marginBottom: "8rem",
        }}
      >
        <PageTitle title={"LATEST PROJECTS"} />
        <ProjectsList />
      </Box>
      <Footer />
    </Box>
  );
}

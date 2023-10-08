import { Box, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import PageTitle from "./PageTitle";
import ProjectsList from "./ProjectsList";

export default function ProjectsContent() {

  const theme = useTheme();
  return (
   <Box
   sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    // border: "1px solid black",
    zIndex: "1000",
  }}>
   <PageTitle title = {"LATEST PROJECTS"}/>
   <ProjectsList />
   </Box>
  );
}

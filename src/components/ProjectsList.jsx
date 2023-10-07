import { Box, Grid, Typography } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import ProjectItemCard from "./ProjectItemCard";
import {useState, useEffect} from "react";
import {client} from "../client"; 


export default function ProjectsList() {
  const theme = useTheme();
    const [projects, setProjects] = useState([]);

  useEffect(() => {
    client
      .getEntries({
        content_type: "fredegdProjects",
      })
      .then((response) => {
        console.log(response.items)
        setProjects(response.items);
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <Box sx={{ maxWidth:"1280px",paddingX:{xs:"1rem",sm:"2.5rem",md:"2.5rem"} }}>
    <Grid container spacing={5}>
      {projects && projects.map((project) => (
        <Grid item xs={12} sm={12} md={6} lg={4} key={project.sys.id}>
          <ProjectItemCard project={project} />
        </Grid>
      ))}
    </Grid>
  </Box>
  )
}

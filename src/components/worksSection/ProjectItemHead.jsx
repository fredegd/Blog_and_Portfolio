import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Block } from "@mui/icons-material";

export default function ProjectItemHead({ project }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        alignItems: "flex-start",
        backgroundColor: theme.palette.background.main,
        maxWidth: "1280px",
        zIndex: "1000",
        // boxShadow: `0px 0px 10px 10px ${theme.palette.text.highlightAlt}88`,
      }}
    >
      <Box
        sx={{
          height: {
            xs: "66vw",
            // md: "29vw",
            lg: "845px",
            // xl: "15.5rem",
          },
          width: "90vw",
          maxWidth: "1280px",
          alignSelf: "center",
          backgroundImage: `url(${project.fields.titleBanner.fields.file.url})`,
          backgroundPosition: "center",
          backgroundSize: `auto 100%`,
          backgroundRepeat: "no-repeat",
        }}
      ></Box>

      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: "6.2vw",
            sm: "6.5vw",
            md: "5.5vw",
            lg: "4.5vw",
          },
          padding: "1rem",
          transition: "all 0.5s ease-in-out",
          fontWeight: "bold",
          textAlign: "justify",
        }}
      >
        {project.fields.title}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "4vw", sm: "4vw", md: "3vw", lg: "2vw" },
          fontStyle: "italic",
          padding: { xs: "1rem", md: 1.5 },
          pb: "1rem",
        }}
      >
        {' " '}
        {project.fields.category} {' " '}
      </Typography>

      <Box
        className="project-links"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          px: { xs: 2, md: 0 },
          fontSize: { xs: "2.5vw", sm: "1rem", md: "1.2rem", lg: "1rem" },
          gap: "0.5rem",
          padding: { xs: "1rem", md: "2rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {project &&
            project.fields.links.links.map((link, index) => {
              return (
                <Link to={link.linkTo} target="_blank" key={index}>
                  <Button
                    sx={{
                      height: "3rem",
                      margin: "0.5rem",
                      borderRadius: "0.5rem",
                      padding: { xs: "0.25rem ", md: "0.95rem" },
                      fontSize: { xs: "1.15rem", md: "1.4rem" },
                      letterSpacing: { sm: "-0.055rem", md: "0.065rem" },
                      color: theme.palette.text.primary,
                      backgroundColor: `${theme.palette.text.highlightAlt}55`,

                      border: `2px solid ${theme.palette.text.highlight}`,
                      "&:hover": {
                        backgroundColor: `${theme.palette.text.highlightAlt}`,
                        boxShadow: `0px 0px 5px 5px ${theme.palette.text.highlight}`,
                      },
                    }}
                  >
                    {link.type}
                  </Button>
                </Link>
              );
            })}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="h6">Technologies:</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {project.fields.tags.technologies.map((tag, index) => {
              const tagIcon = "devicon-" + tag.toLowerCase() + "-plain";
              console.log(tagIcon);
              return (
                <Box
                  key={index}
                  className="loop-infinity"
                  sx={{
                    // border: `3px solid ${theme.palette.text.highlight}cc`,
                     borderBottom: `3px solid ${theme.palette.text.highlight}cc`,
                    color: theme.palette.text.highlight,
                     margin: "0.5rem",
                    borderRadius: "0.5rem",
                    padding: "0.5rem",
                    minWidth: {xs:"none",md:"6rem"},
                    minHeight: {xs:"none",md:"6rem"},
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    // boxShadow: `0px 0px 10px 1px ${theme.palette.text.primary}}`,
                  }}
                >
                  <Typography variant="h4" fontSize={"2.2rem"} px={3} display={{xs:"none", md:"block"}}>
                    {" "}
                    <i className={tagIcon} />
                  </Typography>
                  <Typography variant="p" fontSize={"1rem"} >
                  {tag}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

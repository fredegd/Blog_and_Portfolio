import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useTheme } from "@mui/material/styles";

import { client } from "../client";
import { Box, Typography, Button } from "@mui/material";

import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import ProjectItemHead from "./ProjectItemHead";
import Footer from "./Footer";

export default function ProjectItem() {
  const theme = useTheme();
  const [project, setProject] = useState();

  const [exampleImages, setExampleImages] = useState([]);

  const { projectId } = useParams();

  useEffect(() => {
    client
      .getEntry(projectId)
      .then((response) => {
        setProject(response);
        window.scrollTo(0, 0);

        console.log(response);
        // console.log(response.sys.id, blogItemid);
        if (response.fields.exampleImages) {
          // console.log(response.fields.contentImages);
          setExampleImages(response.fields.exampleImages);
        }
      })
      .catch((err) => console.log(err));
  }, [projectId]);

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
    }, // Add more renderNode functions as needed for other block types

    renderMark: {},
    renderInline: {},
  };

  const renderRichText = (richText) => {
    return documentToReactComponents(richText, options);
  };

  console.log(exampleImages);
  if (!project) {
    // console.log("done");
    return (
      <div>
        <h1>LOADING</h1>
      </div>
    );
  } else {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <ProjectItemHead project={project} />

        <Box
          sx={{
            zIndex: "1000",
            width: { xs: "100vw", sm: "100vw", md: "100vw", lg: "100vw" },
            paddingBottom: "5rem",
            paddingTop: "3rem",
            paddingX: { xs: "1rem", sm: "2rem", md: "3rem", lg: "3rem" },
            background: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 20%, ${theme.palette.background.main} 40%, ${theme.palette.background.main} 60%, ${theme.palette.background.transparent} 80%,  #00000000 100%)`,
            display: "flex",
            flexDirection: "column",
            overflowX: "visible",
            alignItems: "center",
          }}
        >
          {/* <BlogItemHeading blog={blog} /> */}

          <Box
            sx={{
              marginTop: "3rem",
              marginBottom: "3rem",
              maxWidth: "900px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            {renderRichText(project.fields.description)}
          </Box>
          <Link to={project.fields.links.gitHubRepo} target="_blank">
            <Button>Repository</Button>
          </Link>
          <Link to={project.fields.links.demo} target="_blank">
            <Button>Demo</Button>
          </Link>
        </Box>

        {exampleImages &&
          exampleImages.map((image, index) => {
            return (
              <Box
                key={index}
                zIndex={1000}
                sx={{
                  backgroundColor: `${theme.palette.background.main}`,
                  height: { xs: "62vw", sm: "62vw", md: "62vw", lg: "42vw" },
                  border: "2px solid black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  marginBottom: "3rem",
                }}
              >
                <Typography variant="h6" textAlign="left">
                  {image.fields.description}
                </Typography>
                <Box
                  sx={{
                    height: { xs: "60vw", sm: "60vw", md: "60vw", lg: "40vw" },
                    width: { xs: "90vw", sm: "90vw", md: "90vw", lg: "70vw" },
                    backgroundImage: `url(${image.fields.file.url})`,
                    backgroundPosition: "cover",
                    backgroundSize: `100% auto`,
                    backgroundRepeat: "no-repeat",
                    transition: "all 0.5s ease-in-out",
                    zIndex: "1000",
                  }}
                >
                  {/* content image */}
                </Box>
              </Box>
            );
          })}

        <Footer />
      </Box>
    );
  }
}

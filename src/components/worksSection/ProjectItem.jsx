import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useTheme } from "@mui/material/styles";

import { contentfulClient } from "../../utils/contentfulClient";
import { Box, Typography, Button } from "@mui/material";

import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import ProjectItemHead from "./ProjectItemHead";
import Footer from "../shared/Footer";

import FullScreenPreview from "./FullScreenPreview";

const links = {};

export default function ProjectItem() {
  const theme = useTheme();
  const [project, setProject] = useState();

  const [exampleImages, setExampleImages] = useState([]);

  const [previewImage, setPreviewImage] = useState();
  const [openPreview, setOpenPreview] = useState(false);

  const { projectId } = useParams();

  useEffect(() => {
    contentfulClient
      .getEntry(projectId)
      .then((response) => {
        setProject(response);
        window.scrollTo(0, 0);

        if (response.fields.exampleImages) {
          setExampleImages(response.fields.exampleImages);
        }
        if (response.fields.links) {
          setExternalLinks(response.fields.links);
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
          paddingX: { xs: "1rem", sm: "2rem", md: "3rem", lg: "3rem" },
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

            maxWidth: "900px",

            paddingX: { xs: "0.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },

            background: {
              xs: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 5%, ${theme.palette.background.main}cc 20%, ${theme.palette.background.main}cc 80%, ${theme.palette.background.transparent} 95%,  #00000000 100%)`,
              lg: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 15%, ${theme.palette.background.main}cc 30%, ${theme.palette.background.main}cc 70%, ${theme.palette.background.transparent} 85%,  #00000000 100%)`,
            },
            display: "flex",
            flexDirection: "column",
            overflowX: "visible",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              marginTop: "3rem",
              marginBottom: "3rem",
              maxWidth: "900px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
              fontSize: { xs: "1.2rem", sm: "1.2rem", md: "1.2rem", lg: "1.2rem" },
            }}
          >
            {renderRichText(project.fields.content)}
          </Box>
          {exampleImages &&
            exampleImages.map((image, index) => {
              return (
                <Box
                  key={index}
                  zIndex={1000}
                  sx={{
                     backgroundColor: `${theme.palette.background.main}`,
                    // height: { xs: "62vw", sm: "62vw", md: "62vw", lg: "42vw" },
                    border: "2px solid black",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginBottom: "8rem",
                  }}
                >
                  <Typography
                    variant="h6"
                    textAlign="left"
                    sx={{
                      maxWidth: {
                        xs: "90vw",
                        sm: "90vw",
                        md: "60vw",
                        lg: "50vw",
                      },
                      padding: "1rem 0.5rem",
                    }}
                  >
                    {image.fields.title}
                  </Typography>
                  <Box
                    onClick={(e) => {
                      // window.open(image.fields.file.url, "_blank");
                      // console.log(e);
                      setOpenPreview(true);
                      setPreviewImage(image);
                    }}
                    sx={{
                      // aspect ratio 1.66/1
                      height: {
                        xs: `${90 * 0.602}vw`,
                        sm: `${90 * 0.602}vw`,
                        md: `${70 * 0.602}vw`,
                        lg: `${50 * 0.602}vw`,
                      },
                      width: { xs: "90vw", sm: "90vw", md: "70vw", lg: "50vw" },

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
                  <Typography
                    variant="p"
                    sx={{
                      width: { xs: "90vw", sm: "90vw", md: "70vw", lg: "50vw" },
                      padding: "1rem 0.5rem",
                      textAlign: "justify",
                    }}
                  >
                    {image.fields.description}
                  </Typography>
                </Box>
              );
            })}
          <Button
            component={Link}
            to={"/works"}
            sx={{
              my: "2rem",
            }}
          >
            {"      back to works         "}
          </Button>
          {previewImage && (
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <FullScreenPreview
                openPreview={openPreview}
                setOpenPreview={setOpenPreview}
                image={previewImage.fields.file.url}
                title={previewImage.fields.title}
                description={previewImage.fields.description}
              />
            </Box>
          )}
        </Box>
        <Footer />
      </Box>
    );
  }
}

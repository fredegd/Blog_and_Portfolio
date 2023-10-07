import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useTheme } from "@mui/material/styles";

import { client } from "../client";
import { Box, Typography } from "@mui/material";

import { BLOCKS, INLINES } from "@contentful/rich-text-types";

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
        // setProject(response.fields);
        // window.scrollTo(0, 0);

        console.log(response);
        // console.log(response.sys.id, blogItemid);
        // if (response.fields.exampleImages) {
        //   // console.log(response.fields.contentImages);
        //   setExampleImages(response.fields.exampleImages);
        // }
      })
      .catch((err) => console.log(err));
  }, [projectId]);

 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        // Show the button when scrolling down 200px
        setShowBackToTop(true);
      } else {
        // Hide the button when scrolling back to the top
        setShowBackToTop(false);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const { content } = node;
        // console.log(node)
        const text = content.map((c) => c.value).join("");
        if (text.startsWith("#img")) {
          const imgIndex = parseInt(text.substring(4));
          if (blog && blog.contentImages && blog.contentImages[imgIndex]) {
            const imgUrl = blog.contentImages[imgIndex].fields.file.url;
            // console.log(imgIndex)
            return (
              <Box key={imgIndex + "img"}>
                <Box
                  sx={{
                    marginY: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" },
                    height: {
                      xs: "90vw",
                      sm: "60vw",
                      md: "600px",
                      lg: "600px",
                    },
                    width: { xs: "90vw", sm: "90vw", md: "800px", lg: "800px" },
                    backgroundImage: `url(${contentImages[imgIndex].fields.file.url})`,
                    backgroundPosition: "center",
                    backgroundSize: `100% auto`,
                    backgroundRepeat: "no-repeat",
                    transition: "all 0.5s ease-in-out",
                  }}
                >
                  {/* content image */}
                  {/* <Typography variant="h1" >WTF</Typography> */}
                </Box>
              </Box>
            );
          }
        }
        return <p>{children}</p>;
      }, // Add more renderNode functions as needed for other block types
    },
    renderMark: {},
    renderInline: {},
  };
  const renderRichText = (richText) => {
    return documentToReactComponents(richText, options);
  };

  const displayContent = (content) => {
    let id = 0;

    const paragraphs = renderRichText(content);

    const update = paragraphs.map((paragraph, index) => {
      if (paragraph.props.children[0] === `img0${id}`) {
        console.log(id);
        console.log(paragraph.props);
        id++;
        return (
          <Box
            key={index}
            sx={{
              height: { xs: "90vw", sm: "60vw", md: "50vw", lg: "40vw" },
              width: { xs: "90vw", sm: "90vw", md: "85vw", lg: "70vw" },
              backgroundImage: `url(${contentImages[0].fields.file.url})`,
              backgroundPosition: "center",
              backgroundSize: `100% auto`,
              backgroundRepeat: "no-repeat",
              transition: "all 0.5s ease-in-out",
            }}
          >
            {/* content image */}
          </Box>
        );
      } else {
        return paragraph;
      }
    });

    return update;
  };

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
              textAlign: "justify",
            }}
          >
            {displayContent(project.description)}
          </Box>
        </Box>

        <Footer />
      </Box>
    );
  }
}

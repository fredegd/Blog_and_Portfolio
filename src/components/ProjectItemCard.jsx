import ReactMarkdown from "react-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { motion, useAnimation } from "framer-motion";

import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import { useDarkMode } from "../context/DarkModeContext.jsx";

export default function ProjectItemCard({ project }) {
  const { dk } = useDarkMode();
  const theme = useTheme();

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      // Add more renderNode functions as needed for other block types
    },
    renderMark: {},
    renderInline: {},
  };
  const renderRichText = (richText) => {
    return documentToReactComponents(richText, options);
  };

  const extractTextFromRichText = (content) => {
    if (!content) return "";

    return content.content
      .map((node) => {
        if (node.nodeType === "text" && node.value) {
          return node.value;
        } else if (node.nodeType === "paragraph") {
          return extractTextFromRichText(node);
        } else if (node.content) {
          return extractTextFromRichText(node);
        }
        return "";
      })
      .join(" ");
  };

  // Truncate the text to the first 45 chars

  const truncatedTitle = () => {
    const title = project.fields.title;
    if (title.length < 40) {
      return title;
    } else {
      return title.split("").slice(0, 45).join("").trim() + "...";
    }
  };

  // Truncate the text to the first 20 words

  const truncatedContent = () => {
    const contentPreview = extractTextFromRichText(project.fields.description);
    const words = contentPreview.split(" ");
    if (words.length < 20) {
      return words.join(" ");
    } else {
      return words.slice(0, 20).join(" ") + " [...]";
    }
  };

  // console.log(truncatedContent);

  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.08,
          filter: "none !important",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link
          to={`/projects/read/${project.sys.id}`}
          style={{
            textDecoration: "none",
            color: theme.palette.text.secondary,
          }}
        >
          <Box
            sx={{
              backgroundColor: `${theme.palette.background.main}88`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: {xs:"100vw",sm:"90vw",md:"47vw",lg:"30vw"},
              maxHeight: {lg:"400px"},
              border: `5px solid ${theme.palette.text.highlight}`,
              boxShadow: `0 0 10px ${theme.palette.text.highlight}`,
              padding: "1rem",
              "&:hover": {
                backgroundColor: `${theme.palette.background.main}`,
                border: `5px solid ${theme.palette.text.highlightAlt}`,
                boxShadow: `0 0 10px ${theme.palette.text.highlightAlt}`,
                color: theme.palette.text.primary,
              },
            }}
          >
            {project && (
              <>
                {" "}
                <Box
                  sx={{

                    height: { xs: "66vw",  md: "32vw",lg:"20vw" },

                    width: "100%",
                    backgroundImage: `url(${project.fields.titleImage.fields.file.url})`,
                    filter: "grayscale(90%)",
                    backgroundPosition: "center",
                    backgroundSize: `100% auto`,
                    backgroundRepeat: "no-repeat",
                    transition: "all 0.5s ease-in-out",
                    "&:hover": {
                      filter: "grayscale(0%)",
                    },
                  }}
                >
                  {/* background image */}
                </Box>

                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{
                    width: "100%",
          
                  }}
                >
                  <Box display={"flex"} alignItems={"flex-Start"}>
                    <Typography
                      variant="h6"
                      fontWeight={"bold"}
                      // textAlign={"left"}
                      lineHeight={"1"}
                      sx={{
                        fontSize: {
                          xs: "1.8rem",
                          sm: "2rem",
                          md: "1.4rem",
                          lg: "1.6rem",
                          xl: "1.7rem",
                        },
                        zIndex: "100",
                        color: theme.palette.text.primary,
                        textAlign: "justify",
                        textJustify: "interWord",
                      }}
                    >
                      {truncatedTitle()}
                    </Typography>
                  </Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    sx={{
                      // color: theme.palette.text.secondary,
                      "&:hover": { color: "inherit" },
                    }}
                  >
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: "0.8rem",
                        textAlign: "justify",
                        textJustify: "interWord",
                        zIndex: "100",
                        letterSpacing: `0.08vw`,
                      }}
                    >
                      {truncatedContent()}
                    </Typography>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Link>
      </motion.div>
    </>
  );
}

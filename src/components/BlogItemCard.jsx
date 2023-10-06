import ReactMarkdown from "react-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { motion, useAnimation } from "framer-motion";

import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

import { useDarkMode } from "../context/DarkModeContext.jsx";

export default function BlogItemCard({ blog }) {
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
    const title = blog.fields.title;
    if (title.length < 40) {
      return title;
    } else {
      return title.split("").slice(0, 45).join("").trim() + "...";
    }
  };

  // Truncate the text to the first 20 words

  const truncatedContent = () => {
    const contentPreview = extractTextFromRichText(blog.fields.content);
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
          to={`/blog/read/${blog.sys.id}`}
          style={{
            textDecoration: "none",
            color: theme.palette.text.secondary,
          }}
        >
          <Box
            sx={{
              height: {
                xs: "45vw",
                sm: "60vw",
                md: "38vw",
                lg: "24rem",
                xl: "24rem",
              },
              backgroundColor: `${theme.palette.text.highlight}55`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              minHeight: "20rem",
              border: `5px solid ${theme.palette.text.highlight}`,
              boxShadow: `0 0 10px ${theme.palette.text.highlight}`,
              padding: "1rem",
              "&:hover": {
                backgroundColor: `${theme.palette.text.highlightAlt}55`,
                border: `5px solid ${theme.palette.text.highlightAlt}`,
                boxShadow: `0 0 10px ${theme.palette.text.highlightAlt}`,
                color: theme.palette.text.primary,
              },
            }}
          >
            {blog && (
              <>
                {" "}
                <Box
                  sx={{
                    zIndex: "100",
                    height: "50vw",
                    maxHeight: { xs: "16rem", sm: "50vw", md: "20rem" },
                    width: "100%",
                    backgroundImage: `url(${blog.fields.blogTitleImage.fields.file.url})`,
                    filter: "grayscale(90%)",
                    backgroundPosition: "center",
                    backgroundSize: `100% auto`,
                    backgroundRepeat: "no-repeat",
                    transition: "all 0.3s ease-in-out",
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
                    // marginTop: "1rem",
                    // transition: "all 0.5s ease-in-out",
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
                          xs: "1.4rem",
                          sm: "1.4rem",
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

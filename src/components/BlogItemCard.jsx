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

  const titlePreview = blog.fields.title;

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

  const contentPreview = extractTextFromRichText(blog.fields.content);

  // Truncate the text to the first 100 words
  const words = contentPreview.split(" ");
  const truncatedContent = words.slice(0, 20).join(" ");

  // console.log(truncatedContent);

  return (
    <>
      <motion.div
        whileHover={{
          scale: 1.08,
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
                xs: "34rem",
                sm: "28rem",
                md: "28rem",
                lg: "28rem",
                xl: "28rem",
              },
              backgroundColor: `${theme.palette.background.transparent}`,
              display: "flex",
              flexDirection: "column",
              minHeight: "25rem",
              border: `5px solid ${theme.palette.text.highlight}`,
              padding: "1rem",
              "&:hover": {
                border: `5px solid ${theme.palette.text.highlightAlt}`,
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
                    height: { xs: "22rem", sm: "12rem", md: "15rem" },
                    width: "100%",
                    backgroundImage: `url(${blog.fields.blogTitleImage.fields.file.url})`,
                    backgroundPosition: "center",
                    backgroundSize: `100% auto`,
                    backgroundRepeat: "no-repeat",
                    transition: "all 0.5s ease-in-out",
                  }}
                >
                  {/* background image */}
                </Box>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{
                    width: "100%",
                    marginTop: "1rem",
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
                          xs: "1.9rem",
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
                      {titlePreview}
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
                      }}
                    >
                      {truncatedContent + " [...]"}
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

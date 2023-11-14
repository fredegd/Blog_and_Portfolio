import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { Typography, Box } from "@mui/material";




const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Typography
          sx={{
            paddingX: { xs: "1.3rem", sm: "1rem", md: "0.5rem", lg: "0rem" },
            marginY: { xs: "1rem", sm: "1.5rem", md: "1.5rem", lg: "1.5rem" },
            fontSize: {
              xs: "1.2rem",
              sm: "1.3rem",
              md: "1.4rem",
              lg: "1.5rem",
            },
          }}
        >
          {children}
        </Typography>
      ), // Add more renderNode functions as needed for other block types
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const imgUrl = node.data.target.fields.file.url;
        return (
          <Box>
            <Box
              component="img"
              sx={{
                paddingX: {
                  xs: "1.3rem",
                  sm: "1rem",
                  md: "0.5rem",
                  lg: "0rem",
                },

                marginY: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" },
                height: "auto", //{ xs: "97vw", sm: "90vw", md: "900px", lg: "900px" },
                width: { xs: "97vw", sm: "90vw", md: "900px", lg: "900px" },
                backgroundPosition: "center",
                backgroundSize: `contain`,
                backgroundRepeat: "no-repeat",
                transition: "all 0.5s ease-in-out",
              }}
              src={imgUrl}
            >
              {/* content image */}
              {/* <Typography variant="h1" >WTF</Typography> */}
            </Box>
          </Box>
        );
      },
    },
    renderMark: {},
    renderInline: {},
  };


  const renderRichText = (richText) => {
    return documentToReactComponents(richText, options);
  };

  export const displayContent = (content) => {
    let id = 0;
    const paragraphs = renderRichText(content);
    return paragraphs;
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

// Truncate the text to the first 70 chars

export const truncatedTitle = (title) => {
  if (title.length < 70) {
    return title;
  } else {
    return title.split("").slice(0, 70).join("").trim() + " ...";
  }
};

// Truncate the text to the first 15 words

export const truncatedContent = (content) => {
  const contentPreview = extractTextFromRichText(content);
  const words = contentPreview.split(" ");
  if (words.length < 15) {
    return words.join(" ");
  } else {
    return words.slice(0, 15).join(" ") + " [...]";
  }
};

// console.log(truncatedContent);

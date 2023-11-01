import { Box } from "@mui/material";
import { useRef } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Typography } from "@mui/material";

export default function BlogItemContent({ blog }) {
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.PARAGRAPH]: (node, children) => <Typography sx={{
        paddingX: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },

      }}>{children}</Typography>, // Add more renderNode functions as needed for other block types
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const imgUrl = node.data.target.fields.file.url;
        return (
          <Box>
            <Box
              component="img"
              sx={{
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

  const displayContent = (content) => {
    let id = 0;
    const paragraphs = renderRichText(content);
    // const update = paragraphs.map((paragraph, index) => {
    //   return paragraph;
    // });

    // return update;
    return paragraphs
  };

  return (
    <Box
      className="blog-content"
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
      {displayContent(blog.fields.content)}
    </Box>
  );
}

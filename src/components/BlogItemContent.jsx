import { Box } from "@mui/material";
import { useRef } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";

export default function BlogItemContent({ blog }) {
  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>, // Add more renderNode functions as needed for other block types
      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        const imgUrl = node.data.target.fields.file.url
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
              backgroundImage: `url(${blog.fields.contentImages[0].fields.file.url})`,
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

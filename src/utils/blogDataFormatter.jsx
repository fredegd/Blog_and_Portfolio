import { BLOCKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import { Typography, Box } from "@mui/material";

const options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (node, children) => (
      <Typography
        variant="h1"
        sx={{
          paddingX: { xs: "1.3rem", sm: "1rem", md: "0.5rem", lg: "0rem" },
          marginY: { xs: "1rem", sm: "1.5rem", md: "1.5rem", lg: "1.5rem" },
        }}
      >
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Typography
        variant="h2"
        sx={{
          paddingX: { xs: "1.3rem", sm: "1rem", md: "0.5rem", lg: "0rem" },
          marginY: { xs: "1rem", sm: "1.5rem", md: "1.5rem", lg: "1.5rem" },
        }}
      >
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Typography
        variant="h3"
        sx={{
          paddingX: { xs: "1.3rem", sm: "1rem", md: "0.5rem", lg: "0rem" },
          marginY: { xs: "1rem", sm: "1.5rem", md: "1.5rem", lg: "1.5rem" },
        }}
      >
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <Typography
        variant="h4"
        sx={{
          paddingX: { xs: "1.3rem", sm: "1rem", md: "0.5rem", lg: "0rem" },
          marginY: { xs: "1rem", sm: "1.5rem", md: "1.5rem", lg: "1.5rem" },
        }}
      >
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <Typography
        variant="h5"
        sx={{
          paddingX: { xs: "1.3rem", sm: "1rem", md: "0.5rem", lg: "0rem" },
          marginY: { xs: "1rem", sm: "1.5rem", md: "1.5rem", lg: "1.5rem" },
        }}
      >
        {children}
      </Typography>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <Typography
        variant="h6"
        sx={{
          paddingX: { xs: "1.3rem", sm: "1rem", md: "0.5rem", lg: "0rem" },
          marginY: { xs: "1rem", sm: "1.5rem", md: "1.5rem", lg: "1.5rem" },
        }}
      >
        {children}
      </Typography>
    ),

    [BLOCKS.PARAGRAPH]: (node, children) => (
      <Typography
        variant="p"
        sx={{
          paddingX: { xs: "1.3rem", sm: "1rem", md: "0.5rem", lg: "0rem" },
          marginY: { xs: "1rem", sm: "1.5rem", md: "1.5rem", lg: "1.5rem" },
          fontSize: {
            xs: "1.0rem",
            sm: "1.15rem",
            md: "1.18rem",
            lg: "1.25rem",
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

              marginY: { xs: "1rem", sm: "1rem", md: "1rem", lg: "1rem" },
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

export const publishedAt = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};
export const lastUpdate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

// Calculate the length of the blog in minutes
//
export const blogLength = (content) => {
  const contentArray = renderRichText(content.fields.content).map((el) => {
    return (
      typeof el.props.children[0] === "string" && el.props.children[0].length
    );
  });
  return Math.ceil(contentArray.reduce((a, b) => a + b, 0) / 5 / 250); //250 is the average word count per minute and 5 is the average length of a word
};

export const displayContent = (content) => {
  let id = 0;
  const paragraphs = renderRichText(content);
  return paragraphs;
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
  const contentPreview = content.content[0].content[0].value;
  // console.log(contentPreview);
  const words = contentPreview.split(" ");
  if (words.length < 15) {
    return words.join(" ");
  } else {
    return words.slice(0, 15).join(" ") + " [...]";
  }
};

// console.log(truncatedContent);

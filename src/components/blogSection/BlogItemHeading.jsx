import { Box, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export default function BlogItemHeading({ blog }) {
  const theme = useTheme();
  const createdAt = new Date(blog.sys.createdAt).toLocaleDateString();
  // +" at:" +new Date(blog.sys.createdAt).toLocaleTimeString();
  const updatedAt = new Date(blog.sys.updatedAt).toLocaleDateString();
  // + " at:" + new Date(blog.sys.updatedAt).toLocaleTimeString();

  const options = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => <h1>{children}</h1>,
      [BLOCKS.PARAGRAPH]: (node, children) => {
        const { content } = node;
        const text = content.map((c) => c.value).join("");
        if (text.startsWith("#img")) {
          const imgIndex = parseInt(text.substring(4));
          if (
            blog &&
            blog.fields.contentImages &&
            blog.fields.contentImages[imgIndex]
          ) {
            const imgUrl = blog.fields.contentImages[imgIndex].fields.file.url;
            return (
              <Box key={imgIndex + "img"}>
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
  const blogLength = () => {
    const contentArray = renderRichText(blog.fields.content).map((el) => {
      return (
        typeof el.props.children[0] === "string" && el.props.children[0].length
      );
    });
    return Math.ceil(contentArray.reduce((a, b) => a + b, 0) / 5 / 250); //250 is the average word count per minute and 5 is the average length of a word
  };
  // console.log(blogLength());

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        background: {
          xs: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 5%, ${theme.palette.background.main} 20%, ${theme.palette.background.main} 80%, ${theme.palette.background.transparent} 95%,  #00000000 100%)`,
          lg: `linear-gradient(90deg, #00000000 0%,${theme.palette.background.transparent} 15%, ${theme.palette.background.main} 30%, ${theme.palette.background.main} 70%, ${theme.palette.background.transparent} 85%,  #00000000 100%)`,
        },
        maxWidth: "1280px",

        // boxShadow: `0px 0px 15px 15px ${theme.palette.text.highlight}`,
      }}
    >
      <Box
        sx={{
          height: "60vw",
          width: "90vw",
          maxWidth: "1280px" || "100%",
          maxHeight: `${1280 * 0.66}px`,
          alignSelf: "center",
          backgroundImage: `url(${blog.fields.titleBanner.fields.file.url})`,
          backgroundPosition: "cover",
          backgroundSize: `100% auto`,
          backgroundRepeat: "no-repeat",
          transition: "all 0.5s ease-in-out",

          // border:"2px solid black"
          boxShadow: `0px 0px 10px 10px ${theme.palette.text.highlight}88`,
        }}
      ></Box>
      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: "8.0vw",
            sm: "7.0vw",
            md: "6.0vw",
            lg: "5.0vw",
          },
          padding: "1rem",
          transition: "all 0.5s ease-in-out",
          fontWeight: "bold",
          textAlign: "justify",
        }}
      >
        {blog.fields.title}
      </Typography>
     <Box sx={{width:"100%", maxWidth:"900px", display:"flex", justifyContent:"flex-start"}}>
     <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "5vw", sm: "4vw", md: "3.5vw", lg: "2.55vw" },
          fontStyle: "italic",
          p: { xs: "1rem", md: 0.5 },
          marginY: "1rem",
        }}
      >
        {""}"{blog.fields.subtitle}"
      </Typography>
     </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          paddingX: { xs: "1rem", md: "0rem" },
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: { xs: "flex-start", lg: "space-between" },
        }}
      >
        <Box
          sx={{
            paddingY: { xs: "1rem", md: 1.5 },

            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            variant="p"
            sx={{ textAlign: "left", fontWeight: "bold" }}
          >
            Tags:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {blog.fields.tags.tags.map((tag, index) => {
              return (
                <Typography
                  key={index}
                  variant="p"
                  sx={{
                    mx: "0.5rem",
                    padding: "0.2rem 0.8rem",
                    backgroundColor: theme.palette.text.highlightAlt,
                    color: theme.palette.primary.contrastText,
                    fontSize: { xs: "0.8rem", sm: "1rem" },
                    borderRadius: "1rem",
                  }}
                >
                  {tag}
                </Typography>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            maxWidth: "900px",

            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            // px: { xs: 2, md: 0 },
            textAlign: "justify",
            fontSize: { xs: "2.8vw", sm: "1rem", md: "1.2rem", lg: "1rem" },
            gap: "0.5rem",
            paddingY: { xs: "1rem", md: "2rem" },
          }}
        >
          <Typography variant="p">
            <strong>Published on: </strong>
            {createdAt} by "{blog.fields.blogAuthor.fields.authorName}"
          </Typography>
          <Typography variant="p">
            <strong>Last edit: </strong>
            {updatedAt} {blogLength()} min read
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

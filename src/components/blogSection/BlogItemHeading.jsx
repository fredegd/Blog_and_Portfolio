import { Box, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import {
  blogLength,
  publishedAt,
  lastUpdate,
} from "../../utils/blogDataFormatter";

export default function BlogItemHeading({ blog }) {
  const theme = useTheme();
  const createdAt = new Date(blog.sys.createdAt).toLocaleDateString();
  // +" at:" +new Date(blog.sys.createdAt).toLocaleTimeString();
  const updatedAt = new Date(blog.sys.updatedAt).toLocaleDateString();
  // + " at:" + new Date(blog.sys.updatedAt).toLocaleTimeString();

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
          height: "66vw",
          width: "100vw",
          maxWidth: "1280px" || "100%",
          maxHeight: `${1280 * 0.66}px`,
          alignSelf: "center",
          backgroundImage: `url(${blog.fields.titleBanner.fields.file.url})`,
          backgroundPosition: "cover",
          backgroundSize: `100% auto`,
          backgroundRepeat: "no-repeat",
          transition: "all 0.5s ease-in-out",

          // border:"2px solid black"
          // boxShadow: `0px 0px 10px 10px ${theme.palette.text.highlight}88`,
          borderRadius: { xs: "0", lg: "0.5rem" },
          borderBottom: `10px solid ${theme.palette.text.highlight}cc`,
        }}
      ></Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: "8vw",
              sm: "7.0vw",
              md: "6.0vw",
              lg: "4.0vw",
            },
            padding: "1rem",
            transition: "all 0.5s ease-in-out",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          {blog.fields.title}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            // fontSize: { xs: "5vw", sm: "4vw", md: "3.5vw", lg: "2.55vw" },
            fontStyle: "italic",
            // p: { xs: "1rem", md: 0.5 },
            textAlign: "left",
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
          <Typography variant="h6">Tags:</Typography>
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
                    padding: "0.2rem 0.8rem",
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
            <strong>Published: </strong>
            {publishedAt(blog.sys.createdAt)}, by "
            {blog.fields.blogAuthor.fields.authorName}"
          </Typography>
          <Typography variant="p">
            <strong>Last edit: </strong>
            {lastUpdate(blog.sys.updatedAt)}, {blogLength(blog)} min. read
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

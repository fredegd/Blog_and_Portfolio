import { Box, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";

export default function BlogItemHeading({ blog }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        alignItems: "flex-start",
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
          backgroundImage: `url(${blog.blogTitleImage.fields.file.url})`,
          backgroundPosition: "cover",
          backgroundSize: `100% auto`,
          backgroundRepeat: "no-repeat",
          transition: "all 0.5s ease-in-out",

          // border:"2px solid black"
          boxShadow: `0px 0px 15px 15px ${theme.palette.text.highlight}`,
        }}
      >
        {/* content image */}
      </Box>

      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: "5.5vw",
            sm: "5.5vw",
            md: "5.2vw",
            lg: "4.2vw",
          },
          padding: "1rem",
          transition: "all 0.5s ease-in-out",
          fontWeight: "bold",
          textAlign: "justify",
        }}
      >
        {blog.title}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "5vw", sm: "4vw", md: "3.5vw", lg: "2.55vw" },
          fontStyle: "italic",
          padding: { xs: "1rem", md: 1.5 },
          pb: "1rem",
        }}
      >
        {""}"{blog.subtitle}"
      </Typography>
      <Box sx={{width:"100%",display:"flex", flexDirection:{xs:"column",lg:"row"} , justifyContent:{lg:"space-between"}}}>
        <Box
          sx={{
          padding: { xs: "1rem", md: 1.5 },

            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant="p" sx={{ textAlign: "center" }}>
            Tags:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {blog.tags.tags.map((tag, index) => {
              return (
                <Typography
                  key={index}
                  variant="p"
                  sx={{
                    mx: "0.5rem",
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
            px: { xs: 2, md: 0 },
            fontSize: { xs: "2.5vw", sm: "1rem", md: "1.2rem", lg: "1rem" },
            gap: "0.5rem",
            padding: { xs: "1rem", md: "2rem" },
          }}
        >
          <Typography variant="p">
            Published on: "{blog.createdAt}" by "
            {blog.blogAuthor.fields.authorName}"
          </Typography>
          <Typography variant="p">
            Last edit: "{blog.editAt}" {"x"} min. Read
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

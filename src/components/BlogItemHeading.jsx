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
        backgroundColor: theme.palette.background.main,
        maxWidth: "1280px",

        boxShadow: `0px 0px 15px 15px ${theme.palette.text.highlight}`,
      }}
    >
      <Box
        sx={{
          height: "60vw",
          width: "90vw",
          maxWidth: "1280px",
          alignSelf: "center",
          backgroundImage: `url(${blog.blogTitleImage.fields.file.url})`,
          backgroundPosition: "cover",
          backgroundSize: `100% auto`,
          backgroundRepeat: "no-repeat",
          transition: "all 0.5s ease-in-out",
          margin: "1rem",
        }}
      >
        {/* content image */}
      </Box>

      <Typography
        variant="h1"
        sx={{
          fontSize: {
            xs: "6.2vw",
            sm: "6.5vw",
            md: "5.5vw",
            lg: "4.5vw",
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

        <Box
          sx={{
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
      </Box>
    </Box>
  );
}

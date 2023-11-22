import {
  truncatedTitle,
  truncatedContent,
} from "../../utils/blogDataFormatter";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useDarkMode } from "../../context/DarkModeContext.jsx";

export default function BlogItemCard({ blog }) {
  const theme = useTheme();
  const title = blog.fields.title;
  const content = blog.fields.content;

  return !blog ? null : (
    <>
      <motion.div
        whileHover={{
          scale: 1.05,
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
              backgroundColor: `${theme.palette.background.main}cc`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: { xs: "100vw", sm: "90vw", md: "47vw", lg: "30vw" },
              maxHeight: { lg: "400px" },
              boxShadow: `0 0 10px ${theme.palette.text.highlight}`,
              padding: "1rem",
              "&:hover": {
                backgroundColor: `${theme.palette.background.main}`,
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
                    height: { xs: "66vw", md: "32vw", lg: "20vw" },
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
                          xs: "1.5rem",
                          sm: "2rem",
                          md: "1.6rem",
                          lg: "1.6rem",
                          xl: "1.7rem",
                        },
                        zIndex: "100",
                        color: theme.palette.text.primary,
                        textAlign: "left",

                      }}
                    >
                      {truncatedTitle(title)}
                    </Typography>
                  </Box>

                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    sx={{
                      py: "1rem",
                      // color: theme.palette.text.secondary,
                      "&:hover": { color: "inherit" },
                    }}
                  >
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: { xs: "1.1rem", md: "1rem" },
                        textAlign: "left",
                        zIndex: "100",
                        letterSpacing: `0.02vw`,
                      }}
                    >
                      {truncatedContent(content)}
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

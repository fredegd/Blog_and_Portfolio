import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import {
  truncatedTitle,
  truncatedContent,
} from "../../utils/blogDataFormatter";
import { useLocation } from "react-router-dom";

export default function ItemCard({ item, sectionPath }) {
  const theme = useTheme();

  const location = useLocation();
  // console.log({ location });

  const { title, content } = item.fields;

  const linkEnd =
    location.pathname == "/"
      ?  sectionPath+"read/" + item.sys.id
      :  "read/" + item.sys.id;

  return !item ? null : (
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
          to={linkEnd}
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
              borderRadius: "0.25rem",
              //   justifyContent: "flex-start",
              //   height: { xs: "100vw", sm: "90vw", md: "47vw", lg: "30vw" },
              //   maxHeight: { lg: "400px" },
              //   boxShadow: `0 0 10px ${theme.palette.text.highlight}`,
              "&:hover": {
                backgroundColor: `${theme.palette.background.main}`,
                boxShadow: `0 0 10px ${theme.palette.text.highlightAlt}`,
                color: theme.palette.text.primary,
              },
            }}
          >
            <Box
              sx={{
                borderRadius: "0.25rem 0.25rem 0 0",

                height: {
                  xs: "60vw",
                  md: "29vw",
                  lg: "14.5rem",
                  xl: "15.5rem",
                },
                width: "100%",
                backgroundImage: `url(${item.fields.titleBanner.fields.file.url})`,
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
                height: { xs: "auto", md: "12rem", xl: "11rem" },
                justifyContent: "flex-start ",
                gap: "0.5rem",
                padding: "0.8rem",
                textAlign: "left",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  fontWeight={"bold"}
                  // textAlign={"left"}
                  lineHeight={"1"}
                  sx={{
                    zIndex: "100",
                    color: theme.palette.text.primary,
                  }}
                >
                  {truncatedTitle(title)}
                </Typography>
              </Box>

              <Box
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": { color: "inherit" },
                }}
              >
                <Typography
                  variant="p"
                  sx={{
                    zIndex: "100",

                    fontSize: "1rem",
                  }}
                >
                  {truncatedContent(content)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Link>
      </motion.div>
    </>
  );
}

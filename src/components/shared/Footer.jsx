import { Box, Typography, IconButton, Link } from "@mui/material";

import { useTheme } from "@mui/material/styles";

import contactItems from "../../contactItems";
const year = new Date().getFullYear();
export default function Contact() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection:{xs:"column", md:"row"},
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: `${theme.palette.text.highlight}88`,
        fontSize: "20px",
        color: theme.palette.text.contrast,
        width: "100%",
        paddingY:{xs:"1rem", md:"2rem"},
        marginBottom: "1rem",
        zIndex: "1000",
      }}
    >
      <Box
        sx={{
          borderBottom: {xs:`1px solid ${theme.palette.text.primary}`, md:"none"},
          borderRight: {xs:"none", md:`1px solid ${theme.palette.text.primary}`},
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {contactItems.map((item) => (
          <Link href={item.linkTo} target="_blank" key={item.id}>
            <IconButton
              sx={{
                borderRadius: "20%",
                width: "2.0rem",
                height: "2.0rem",
                textAlign: "center",
                textDecoration: "none",
                color: theme.palette.text.primary,
                fill: theme.palette.text.primary,
                padding: "1.5rem",
                marginX: "1rem",
                background: "none",
                border: "2px solid transparent",
                "&:hover": {
                padding: "1.5rem",
                  color: theme.palette.text.contrast,
                  background: `${theme.palette.text.highlightAlt}`,
                  border: `2px solid ${theme.palette.text.primary}`,
                },
              }}
            >
              <Typography variant={"h6"} sx={{ display: "flex" }}>
                {<item.icon sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />}
              </Typography>
            </IconButton>
          </Link>
        ))}
      </Box>
      <Box sx={{ padding: "1.5rem" }}>
        <Typography variant="p" color={theme.palette.text.primary} >
          <span>{year} all rights reserved </span>
          <span>
            ©&nbsp; <Link underline="hover"  color="inherit" href="https://fredegd.dev">fredegd.dev</Link>
          </span>
        </Typography>
      </Box>
    </Box>
  );
}

import { Box, Typography, IconButton, Link } from "@mui/material";


import { useTheme } from "@mui/material/styles";

import contactItems from "../contactItems";

export default function Contact() {
  const theme = useTheme();

  return (

      <Box
        sx={{
          backgroundColor: `${theme.palette.text.highlight}88`,
          fontSize: "20px",
          color: theme.palette.text.contrast,

          width: "100%",
          padding: { xs: "0.5rem", sm: "1.5rem", md: "2.5rem" },
          marginTop: "5rem",
          marginBottom: "1rem",
          zIndex: "1000",

        }}
      >
        <Box
          sx={{

            width: "100%",
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
                  margin: "0 1rem 0 1rem",
                  textDecoration: "none",
                  color: theme.palette.text.primary,

                  "&:hover": {
                    background: `${theme.palette.text.highlightAlt}`,

                    border: `2px solid ${theme.palette.text.primary}`,
                  },
                }}
              >
                <Typography variant={"h6"} sx={{ display: "flex" }}>
                  {
                    <item.icon
                      sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                    />
                  }
                </Typography>
              </IconButton>
            </Link>
          ))}
        </Box>

        <Typography variant="p" color={theme.palette.text.primary}>
          <span>2023 all rights reserved </span>
          <span>©&nbsp;Fred&nbsp;Egidi</span>
        </Typography>
      </Box>

  );
}

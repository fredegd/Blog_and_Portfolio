import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
export default function PageTitle({ title }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.text.highlightAlt}88`,
        color: theme.palette.text.primary,
        width: "100vw",
        maxWidth: "1280px",
        paddingY: "2.5rem",
        marginBottom: "3rem",
        border: `5px solid ${theme.palette.text.highlight}`,
        zIndex: "1000",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "9vw", md: "8vw", lg: "5rem" },
          fontWeight: "500",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

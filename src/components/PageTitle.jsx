import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
export default function PageTitle({ title }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.text.highlight}88`,
        color: theme.palette.text.primary,
        width: "100vw",
        padding: "2.5rem",
        marginBottom: "5rem",
        fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "4rem" },
        zIndex: "1000",
      }}
    >
      <Typography variant="h1">{title}</Typography>
    </Box>
  );
}

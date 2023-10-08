import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
export default function PageTitle({ title }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette.text.highlight}88`,
        color: theme.palette.text.primary,
        width: "100%",
        paddingY: "2.5rem",
        marginBottom: "5rem",

        zIndex: "1000",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: "9vw", md: "8vw", lg: "5rem" },
      fontWeight: "bold",
      }}

      >
        {title}
      </Typography>
    </Box>
  );
}

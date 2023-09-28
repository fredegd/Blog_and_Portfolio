import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
export default function About() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        overflow: "scroll",
        // zIndex: "1000",
        background: "transparent",
      }}
    >
      {" "}
      <Box
        sx={{
          backgroundColor: theme.palette.text.highlight,
          fontSize: "20px",
          zIndex: "100",
          width: "100%",
          padding: "2.5rem",
          marginTop: "5rem",
          zIndex: "1000",
        }}
      >
        <Typography variant="h1">About Me:</Typography>
      </Box>
    </Box>
  );
}

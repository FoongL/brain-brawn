import { Paper, Typography } from "@mui/material";
import React from "react";

const WGScoreboard = ({ firstPart, color, children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "rgb(255, 255, 255, 0.2)",
        px: 2,
        py: 1,
      }}
    >
      <Typography variant="h5" color="white">
        {firstPart}{" "}
        <Typography
          variant="h5"
          sx={{
            display: "inline-flex",
            fontWeight: "700",
            color: `${color}`,
          }}
        >
          {children}
        </Typography>
      </Typography>
    </Paper>
  );
};

export default WGScoreboard;

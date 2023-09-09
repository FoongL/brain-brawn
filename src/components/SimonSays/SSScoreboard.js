import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

const SSScoreboard = ({ color, level, hiScore }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      width="100%"
      padding={2}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "rgb(255, 255, 255, 0.2)",
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="h5" color="white">
          Level:{" "}
          <Typography
            variant="h5"
            sx={{
              display: "inline-flex",
              fontWeight: "700",
              color: `${color}`,
            }}
          >
            {level}
          </Typography>
        </Typography>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "rgb(255, 255, 255, 0.2)",
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="h5">
          HiScore:{" "}
          <Typography
            variant="h5"
            sx={{
              display: "inline-flex",
              fontWeight: "700",
              color: `${color}`,
            }}
          >
            {hiScore}
          </Typography>
        </Typography>
      </Paper>
    </Stack>
  );
};

export default SSScoreboard;

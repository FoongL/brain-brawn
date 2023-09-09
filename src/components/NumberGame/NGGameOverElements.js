import { Stack, Typography } from "@mui/material";
import React from "react";

const NGGameOverElements = ({ currentSequence, userInput }) => {
  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Typography variant="h4">Oops, your number was</Typography>
      <Typography variant="h3" fontWeight={"700"}>
        {currentSequence}
      </Typography>
      <Typography variant="h4">You've entered</Typography>
      <Typography variant="h3" fontWeight={"700"}>
        {userInput}
      </Typography>
    </Stack>
  );
};

export default NGGameOverElements;
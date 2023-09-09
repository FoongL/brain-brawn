import { Stack } from "@mui/material";
import React from "react";
import WGScoreboard from "./WGScoreboard";

const WGScoreboards = ({ score, gameOver, livesLeft, hiScore }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      width="100%"
      padding={2}
    >
      <WGScoreboard firstPart="Score:" color="#BC0066">
        {score}
      </WGScoreboard>
      <WGScoreboard firstPart="Lives left:" color="#BC0066">
        {gameOver ? "💀" : Array(livesLeft).fill("❤")}
      </WGScoreboard>
      <WGScoreboard firstPart="HiScore:" color="#BC0066">
        {hiScore}
      </WGScoreboard>
    </Stack>
  );
};

export default WGScoreboards;

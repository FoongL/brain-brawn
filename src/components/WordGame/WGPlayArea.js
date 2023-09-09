import { Button, Stack, Typography, styled } from "@mui/material";
import React from "react";
import WGPolaroid from "./WGPolaroid";

const StyledButton = styled(Button)({
  fontWeight: "700",
  fontSize: "1.5rem",
  padding: "1rem 2rem",
  backgroundColor: "#BC0066",
  color: "white",
  width: "fit-content",
  "&:hover": {
    backgroundColor: "#940050",
  },
});

const WGPlayArea = ({ displayWord, checkUserInput }) => {
  return (
    <>
      <WGPolaroid>
        <Typography
          variant="h2"
          fontWeight={700}
          fontFamily="'Merriweather', serif"
        >
          {displayWord}
        </Typography>
        {/* <h1>{words}</h1> */}
      </WGPolaroid>
      <Stack direction="row" spacing={5} mt={3}>
        <StyledButton disableRipple name="seen" onClick={checkUserInput}>
          SEEN
        </StyledButton>
        <StyledButton disableRipple name="not-seen" onClick={checkUserInput}>
          NEW
        </StyledButton>
      </Stack>
    </>
  );
};

export default WGPlayArea;

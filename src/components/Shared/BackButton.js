import { Button, styled } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "rgb(255, 255, 255, 0.3)",
  fontWeight: "700",
  fontSize: "3rem",
  borderRadius: "50%",
  width: "1rem",
  aspectRatio: "1/1",
  color: "white",
  "&:hover": {
    backgroundColor: "rgb(255, 255, 255, 0.5)",
  },
}));

const BackButton = (props) => {
  return (
    <StyledButton disableRipple {...props}>
      <ArrowBackIcon fontSize="inherit" sx={{ opacity: "1" }} />
    </StyledButton>
  );
};

export default BackButton;

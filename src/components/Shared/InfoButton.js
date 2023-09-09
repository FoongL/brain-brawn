import { Button, styled } from "@mui/material";
import React from "react";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: "rgb(255, 255, 255, 0.3)",
    fontWeight: "700",
    fontSize: "2.5rem",
    width: "1rem",
    aspectRatio: "1/1",
    borderRadius: "50%",
    color: "white",
    "&:hover": {
        backgroundColor: "rgb(255, 255, 255, 0.5)",
    },
}));

const InfoButton = (props) => {
    return (
        <StyledButton disableRipple {...props}>
            <QuestionMarkIcon fontSize="inherit" />
        </StyledButton>
    );
};

export default InfoButton;
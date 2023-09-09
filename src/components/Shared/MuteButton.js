import { Button, styled } from "@mui/material";
import React from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: "rgb(255, 255, 255, 0.3)",
    fontWeight: "700",
    fontSize: "2rem",
    width: "1rem",
    aspectRatio: "1/1",
    borderRadius: "50%",
    color: "white",
    "&:hover": {
        backgroundColor: "rgb(255, 255, 255, 0.5)",
    },
}));

const MuteButton = ({ muted, ...props }) => {
    return (
        <StyledButton disableRipple {...props}>
            {muted ? <VolumeOffIcon fontSize="inherit" /> : <VolumeUpIcon fontSize="inherit" />}
        </StyledButton>
    );
};

export default MuteButton;
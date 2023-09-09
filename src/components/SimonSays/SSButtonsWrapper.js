import { Box } from "@mui/material";
import React from "react";

const SSButtonsWrapper = ({ children }) => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "600px",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {children}
        </Box>
    );
};

export default SSButtonsWrapper;
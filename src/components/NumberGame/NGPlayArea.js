import { Stack, Typography } from "@mui/material";
import React from "react";

const NGPlayArea = ({ handleSubmit, handleChange, userInput }) => {
    return (
        <Stack justifyContent={"center"} alignItems={"center"}>
            <Typography
                variant="h4"
                component={"h3"}
                color={"inherit"}
                fontFamily={"inherit"}
            >
                What was the number?
            </Typography>
            <form onSubmit={handleSubmit} className="fl-col fl-centered">
                <input
                    autoFocus
                    type="text"
                    onChange={handleChange}
                    value={userInput}
                ></input>
            </form>
        </Stack>
    );
};

export default NGPlayArea;

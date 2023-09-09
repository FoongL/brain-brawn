import { Stack } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BackButton from "../Shared/BackButton";
import InfoButton from "../Shared/InfoButton";
import MuteButton from "../Shared/MuteButton";

const SSNav = ({ muteSound, muted }) => {
  return (
    <Stack direction="row" justifyContent="space-between" width="100%" mt={3}>
      <Link to="/">
        <BackButton />
      </Link>
      <Stack direction="row" spacing={2}>
        <InfoButton />
        <MuteButton onClick={muteSound} muted={muted} />
      </Stack>
    </Stack>
  );
};

export default SSNav;

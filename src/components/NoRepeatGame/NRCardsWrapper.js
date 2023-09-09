
import { Box } from "@mui/material";

const NRCardsWrapper = ({children}) => {
  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        display: "flex",
        gap: "1rem",
        width: { sm: "700px", xs: "300px" },
        flexWrap: "wrap",
      }}
    >
      {children}
    </Box>
  );
};

export default NRCardsWrapper;

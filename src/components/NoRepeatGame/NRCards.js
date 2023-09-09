import { Button, styled } from "@mui/material";


const StyledButton = styled(Button)({
  fontWeight: "700",
  fontSize: "1rem",
  width: "130px",
  aspectRatio: "1/1",
  color: "white",
});


const NRCards = ({isGameOver, isAlreadyClicked, word, onClick}) => {
  let bgColor, borderStyle;
  if (!isGameOver) bgColor = "#F07C31";
  else if (isGameOver && isAlreadyClicked) {
    bgColor = "rgb(240, 124, 49, 0.4)";
    borderStyle = "4px solid white";
  } else {
    borderStyle = "none";
    bgColor = "rgb(240, 124, 49)";
  }
  return (
    <StyledButton
      disableRipple
      sx={{
        backgroundColor: bgColor,
        "&:hover": {
          backgroundColor: "#F56100",
        },
        "&:disabled": {
          backgroundColor: bgColor,
          color: "white",
          border: borderStyle,
        },
      }}
      onClick={() => onClick(word)}
      disabled={isGameOver}
    >
      <h2>{word}</h2>
    </StyledButton>
  );
};

export default NRCards;

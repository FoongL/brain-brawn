import React, { useEffect, useState } from "react";
import { getRandomIntInclusive, timeout } from "../utils";
import { Howl, Howler } from "howler";
import {
  Alert,
  Box,
  Button,
  Container,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  responsiveFontSizes,
  styled,
} from "@mui/material";

import fail808 from "../assets/sounds/fail808.wav";
import succ808 from "../assets/sounds/succ808.wav";

import { isAllNumbers } from "../utils";

import SSNav from "../components/SimonSays/SSNav";
import NGHeadings from "../components/NumberGame/NGHeadings";
import NGScoreboard from "../components/NumberGame/NGScoreboard";
import NGTV from "../components/NumberGame/NGTV";
import NGPlayArea from "../components/NumberGame/NGPlayArea";
import NGGameOverElements from "../components/NumberGame/NGGameOverElements";

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

let theme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    allVariants: {
      color: "white",
    },
  },
});

theme = responsiveFontSizes(theme);

const StyledButton = styled(Button)({
  fontWeight: "700",
  fontSize: "1.5rem",
  padding: "1rem 2rem",
  backgroundColor: "#3CA60F",
  color: "white",
  width: "fit-content",
  "&:hover": {
    backgroundColor: "#3CA60F",
  },
});

const NumberGame = () => {
  const [userInput, setUserInput] = useState("");
  const [currentSequence, setCurrentSequence] = useState([]);
  const [level, setLevel] = useState(1);
  const [hiScore, setHiScore] = useState(0);
  const [display, setDisplay] = useState("");
  const [userIsGuessing, setUserIsGuessing] = useState(false);
  const [showLossScreen, setShowLossScreen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState("");
  const [startSequence, setStartSequence] = useState("ready");

  const successSound = new Howl({
    src: [succ808],
  });

  const failSound = new Howl({
    src: [fail808],
  });

  useEffect(() => {
    Howler.mute(false);
    Howler.volume(0.25);

    const storedHiScores = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_HISCORE)
    );
    if (storedHiScores && storedHiScores.NG) {
      setHiScore(storedHiScores.NG);
    }
  }, []);

  useEffect(() => {
    if (hiScore) {
      const storedHiScores = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_HISCORE)
      );

      if (storedHiScores) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_HISCORE,
          JSON.stringify({
            ...storedHiScores,
            NG: hiScore,
          })
        );
        return;
      }

      localStorage.setItem(
        LOCALSTORAGE_KEY_HISCORE,
        JSON.stringify({
          NG: hiScore,
        })
      );
    }
  }, [hiScore]);

  const generateSequence = () => {
    let randomNumber = [];
    for (let i = 0; i < level; i++) {
      randomNumber.push(getRandomIntInclusive(0, 9));
    }

    console.log("level:", level);
    console.log(randomNumber);

    setCurrentSequence((prevSequence) => {
      return [...randomNumber];
    });
    setLevel((prevLevel) => prevLevel + 1);
    setHiScore((prevHiScore) => Math.max(currentSequence.length, prevHiScore));
    setStartSequence(1);
  };

  const startGame = async () => {
    generateSequence();
  };
  useEffect(() => {
    if (startSequence === 1) {
      setDisplay(currentSequence);
      setUserIsGuessing(false);
      setUserInput("");
      setStartSequence(2);
    } else if (startSequence === 2) {
      const hold = async () => {
        await timeout(currentSequence.length * 1000);
        setDisplay("");
        setUserIsGuessing(true);
      };
      hold();
      setStartSequence("start");
    } else {
      console.log("dis this work???");
    }
  }, [startSequence]);

  const restartGame = () => {
    setUserInput("");
    setCurrentSequence([]);
    setLevel(1);
    setDisplay("");
    setUserIsGuessing(false);
    setShowLossScreen(false);
    setMuted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let input = userInput.trim();
    if (input === "" || !isAllNumbers(input)) {
      setError("Type in numbers only!");
      return;
    }

    if (input === currentSequence.join("")) {
      successSound.play();
      startGame();
    } else {
      failSound.play();
      setUserIsGuessing(false);
      setShowLossScreen(true);
    }
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
    setError("");
  };

  const handleMute = () => {
    setMuted(!muted);
    Howler.mute(!muted);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="NUMBER-GAME">
        <Container>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <SSNav muted={muted} muteSound={handleMute} />
            <NGHeadings />
            <NGScoreboard currentSequence={currentSequence} hiScore={hiScore} />

            <NGTV>
              <Typography
                variant="h1"
                component="h3"
                fontFamily={"'Space Mono', monospace"}
                color={"#74D144"}
                fontWeight={"700"}
                sx={{
                  fontSize: {
                    xs: "30px",
                    sm: "4rem",
                  },
                }}
              >
                {display}
              </Typography>
              {userIsGuessing && (
                <NGPlayArea
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  userInput={userInput}
                />
              )}
              {showLossScreen && (
                <NGGameOverElements
                  currentSequence={currentSequence}
                  userInput={userInput}
                />
              )}
            </NGTV>

            {error !== "" && (
              <Alert
                variant="filled"
                severity="error"
                sx={{
                  backgroundColor: "#F64F4F",
                }}
              >
                {error}
              </Alert>
            )}
            {showLossScreen && (
              <StyledButton
                sx={{
                  mt: 3,
                  backgroundColor: "white",
                  color: "#3CA60F",
                  "&:hover": {
                    backgroundColor: "#F2F2F2",
                  },
                }}
                onClick={restartGame}
              >
                Try again?
              </StyledButton>
            )}
            {level === 1 && (
              <StyledButton sx={{ mt: 3 }} onClick={startGame}>
                Start
              </StyledButton>
            )}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default NumberGame;

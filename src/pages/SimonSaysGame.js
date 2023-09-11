/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import SSButton from "../components/SimonSays/SSButton";
import { getRandomIntInclusive, timeout } from "../utils";
import { Howl, Howler } from "howler";

import fail808 from "../assets/sounds/fail808.wav";

import xyloSounds from "../assets/sounds/xylo/xyloSounds.mp3";
import SSNav from "../components/SimonSays/SSNav";
import {
  Box,
  Button,
  Container,
  Stack,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import SSScoreboard from "../components/SimonSays/SSScoreboard";
import styled from "@emotion/styled";
import SSHeadings from "../components/SimonSays/SSHeadings";
import SSButtonsWrapper from "../components/SimonSays/SSButtonsWrapper";

let emptyArray = new Array(9).fill("");

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

const StartButton = styled(Button)({
  fontWeight: "700",
  fontSize: "1.5rem",
  padding: "1rem 2rem",
  backgroundColor: "#0D4C85",
  color: "white",
  width: "fit-content",
  "&:hover": {
    backgroundColor: "#0B3B66",
  },
});

const RestartButton = styled(Button)({
  fontWeight: "700",
  fontSize: "1.5rem",
  padding: "1rem 2rem",
  width: "fit-content",
  backgroundColor: "white",
  color: "#1164AF",
  "&:hover": {
    backgroundColor: "#F2F2F2",
  },
});

const SimonSaysGame = (props) => {
  const [currentSequence, setCurrentSequence] = useState([]);
  const [currentButtonToLightUp, setCurrentButtonToLightUp] = useState(11);
  const [hiScore, setHiScore] = useState(0);
  const [playerIsGuessing, setPlayerIsGuessing] = useState(false);
  const [steps, setSteps] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const [lastLitButton, setLastLitButton] = useState(11);
  const [muted, setMuted] = useState(false);
  const [startSequence, setStartSequence] = useState("ready");

  const failSound = new Howl({
    src: [fail808],
  });

  const xyloSound = new Howl({
    src: [xyloSounds],
    sprite: {
      xylo1: [0, 755.9863945578231],
      xylo2: [2000, 961.609977324263],
      xylo3: [4000, 491.38321995464815],
      xylo4: [6000, 530.4535147392287],
      xylo5: [8000, 547.913832199546],
      xylo6: [10000, 564.1269841269842],
      xylo7: [12000, 355.9637188208615],
      xylo8: [14000, 484.6712018140593],
      xylo9: [16000, 427.46031746031576],
    },
  });

  useEffect(() => {
    Howler.mute(false);
    Howler.volume(0.25);

    const storedHiScores = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_HISCORE)
    );
    if (storedHiScores && storedHiScores.SS) setHiScore(storedHiScores.SS);
  }, []);

  useEffect(() => {
    console.log("currentButtonToLightUp:", currentButtonToLightUp);

    //if (hiScore !== prevHiScore) {
    const storedHiScores = JSON.parse(
      localStorage.getItem(LOCALSTORAGE_KEY_HISCORE)
    );

    if (storedHiScores) {
      localStorage.setItem(
        LOCALSTORAGE_KEY_HISCORE,
        JSON.stringify({
          ...storedHiScores,
          SS: hiScore,
        })
      );
      return;
    }

    localStorage.setItem(
      LOCALSTORAGE_KEY_HISCORE,
      JSON.stringify({
        SS: hiScore,
      })
    );
    //}
  }, [hiScore]);

  const generateSequence = () => {
    let randomNumber = getRandomIntInclusive(0, 8);
    setCurrentSequence([...currentSequence, randomNumber]);
  };

  const lightUpButtonsInSequence = () => {
    for (let i = 0; i < currentSequence.length; i++) {
      setTimeout(() => {
        setCurrentButtonToLightUp(
          `${currentSequence[i]}${String.fromCharCode(97 + i)}`
        );
      }, i * 1000);
    }
  };

  useEffect(() => {
    let buttonId = currentButtonToLightUp[0];
    xyloSound.play(`xylo${+buttonId + 1}`);
    console.log("Button to light up: " + currentButtonToLightUp);
  }, [currentButtonToLightUp]);

  const handleGameStart = async () => {
    setStartSequence(1);
  };
  const hold = async (time = 1000, multiply = 1) => {
    await timeout(time * multiply);
  };

  useEffect(() => {
    if (startSequence === 1) {
      setCurrentButtonToLightUp(11);
      setShowNextButton(false);
      setIsGameOver(false);
      setStartSequence(2);
    } else if (startSequence === 2) {
      generateSequence();
      setStartSequence(3);
    } else if (startSequence === 3) {
        console.log('current:', currentSequence)
      hold();
      setStartSequence(4);
    } else if (startSequence === 4) {
      lightUpButtonsInSequence();
      setStartSequence(5);
    } else if (startSequence === 5) {
      hold(1000, currentSequence.length);
      setPlayerIsGuessing(true);
      setStartSequence("ready");
    }
  }, [startSequence]);

  const checkCorrectInput = async(id) => {
    console.log('then i end up in here?')
    if (currentSequence[steps] !== id) {
      failSound.play();
      setIsGameOver(true);
      setLastLitButton(currentSequence[steps]);
      restartGame();
      return;
    }

    setSteps(steps+1);
    if (steps+1 === currentSequence.length) {
      setSteps(0);
      setPlayerIsGuessing(false);
      setHiScore((prevHiScore) =>
        Math.max(prevHiScore, currentSequence.length)
      );
      await hold()
      handleGameStart();
    }
  };

  const restartGame = () => {
    setStartSequence()
    setCurrentSequence([]);
    setCurrentButtonToLightUp(11);
    setPlayerIsGuessing(false);
    setSteps(0);
  };
  const muteSound = () => {
    setMuted((prevMuted) => !prevMuted);
    if (muted) {
      Howler.mute(false);
    } else {
      Howler.mute(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="SIMON-SAYS">
        <Container>
          <Stack alignItems={"center"} justifyContent={"center"}>
            <SSNav muted={muted} muteSound={muteSound} />
            <SSHeadings />
            <SSScoreboard
              level={currentSequence.length}
              hiScore={hiScore}
              color="blue"
            />

            <SSButtonsWrapper>
              {emptyArray.map((elem, index) => {
                return (
                  <SSButton
                    key={index}
                    id={index}
                    isDisabled={!playerIsGuessing}
                    toLightUp={currentButtonToLightUp}
                    onCheckCorrectInput={checkCorrectInput}
                    isGameOver={isGameOver}
                    lastLight={lastLitButton}
                  />
                );
              })}
            </SSButtonsWrapper>

            {showNextButton && (
              <StartButton
                disableRipple
                onClick={handleGameStart}
                sx={{ mt: 3 }}
              >
                Start Game
              </StartButton>
            )}

            {isGameOver && (
              <RestartButton
                disableRipple
                onClick={handleGameStart}
                sx={{ mt: 3 }}
              >
                Play Again
              </RestartButton>
            )}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
export default SimonSaysGame;

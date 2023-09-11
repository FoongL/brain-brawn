import { getRandomIntInclusive, getRandomWord, shuffle } from "../utils";
import { Howl, Howler } from "howler";

import fail808 from "../assets/sounds/fail808.wav";
import llbreak from "../assets/sounds/fail.wav";
import succ808 from "../assets/sounds/succ808.wav";
import {
    Box,
    Button,
    Container,
    Stack,
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
    styled,
} from "@mui/material";

import SSNav from "../components/SimonSays/SSNav";
import WGPlayArea from "../components/WordGame/WGPlayArea";
import WGHeadings from "../components/WordGame/WGHeadings";
import WGScoreboards from "../components/WordGame/WGScoreboards";

import React, { useState, useEffect } from 'react';

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
    backgroundColor: "#BC0066",
    color: "white",
    width: "fit-content",
    "&:hover": {
        backgroundColor: "#940050",
    },
});

const RestartButton = styled(Button)({
    fontWeight: "700",
    fontSize: "1.5rem",
    padding: "1rem 2rem",
    width: "fit-content",
    backgroundColor: "white",
    color: "#BC0066",
    "&:hover": {
        backgroundColor: "#F2F2F2",
    },
});


const WordGame = () => {
  const [livesLeft, setLivesLeft] = useState(3);
  const [words, setWords] = useState(new Set());
  const [displayWord, setDisplayWord] = useState('');
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [atGameStart, setAtGameStart] = useState(true);
  const [previousWord, setPreviousWord] = useState('');
  const [muted, setMuted] = useState(false);

  const successSound = new Howl({
    src: [succ808],
  });

  const lostLifeSound = new Howl({
    src: [llbreak],
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
    if (storedHiScores && storedHiScores.WG) {
      setHiScore(storedHiScores.WG);
    }
  }, []);

  useEffect(() => {
      const storedHiScores = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_KEY_HISCORE)
      );

      if (storedHiScores) {
        localStorage.setItem(
          LOCALSTORAGE_KEY_HISCORE,
          JSON.stringify({
            ...storedHiScores,
            WG: hiScore,
          })
        );
        return;
      }

      localStorage.setItem(
        LOCALSTORAGE_KEY_HISCORE,
        JSON.stringify({
          WG: hiScore,
        })
      );
  }, [hiScore]);

  const selectWord = () => {
    setAtGameStart(false);
    let outcome = getRandomIntInclusive(1, 2);

    if (score < 5 || outcome !== 1) {
      let newWord = getRandomWord();
      if (newWord === previousWord) {
        console.log('Same as prev word, getting new one...');
        selectWord();
        return;
      }
      setDisplayWord(newWord);
    } else {
      let newWord = shuffle([...words])[0];
      if (newWord === previousWord) {
        console.log('Same as prev word, getting new one...');
        selectWord();
        return;
      }
      setDisplayWord(newWord);
    }
  };

  const checkUserInput = async (e) => {
    let result = words.has(displayWord);
    if (
      (e.target.name === 'seen' && result) ||
      (e.target.name === 'not-seen' && !result)
    ) {
      successSound.play();
      setScore((prevState) => prevState + 1);
      setWords((prevState) => new Set([...prevState, displayWord]));
      setHiScore((prevState) => Math.max(prevState + 1, hiScore));
      setPreviousWord(displayWord);
      selectWord();
    } else {
      setLivesLeft((prevState) => prevState - 1);
      if (livesLeft - 1 === 0) {
        failSound.play();
        setLivesLeft(0);
        setGameOver(true);
      } else {
        lostLifeSound.play();
        setLivesLeft((prevState) => prevState - 1);
      }
    }
  };

  const muteSound = () => {
    setMuted(!muted);
    if (muted) {
      Howler.mute(true);
    } else {
      Howler.mute(false);
    }
  };

  const restartGame = () => {
    setLivesLeft(3);
    setWords(new Set());
    setDisplayWord('');
    setScore(0);
    setGameOver(false);
    setAtGameStart(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="WORD-GAME">
        <Container>
          <Stack justifyContent={'center'} alignItems={'center'}>
            <SSNav muted={muted} muteSound={muteSound} />
            <WGHeadings />
            <WGScoreboards
              score={score}
              hiScore={hiScore}
              gameOver={gameOver}
              livesLeft={livesLeft}
            />

            {atGameStart && (
              <StartButton
                disableRipple
                onClick={selectWord}
                sx={{ mt: 3 }}
              >
                Start Game
              </StartButton>
            )}

            {!gameOver && !atGameStart && (

              <WGPlayArea
                checkUserInput={checkUserInput}
                displayWord={displayWord}
              />
            )}

            {gameOver && (
              <RestartButton
                disableRipple
                onClick={restartGame}
                sx={{ mt: 3 }}
              >
                Play Again?
              </RestartButton>
            )}
          </Stack>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default WordGame;




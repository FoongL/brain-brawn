import React, { useEffect, useState } from "react";
import { getArrayOfWords, shuffle } from "../utils";
import { Howl, Howler } from "howler";

import fail808 from "../assets/sounds/fail808.wav";
import succ808 from "../assets/sounds/succ808.wav";

import {
    Box,
    Container,
    Stack,
    ThemeProvider,
    createTheme,
    responsiveFontSizes,
} from "@mui/material";

import NRCards from "../components/NoRepeatGame/NRCards";
import SSNav from "../components/SimonSays/SSNav";
import NRHeadings from "../components/NoRepeatGame/NRHeadings";
import NRScoreboard from "../components/NoRepeatGame/NRScoreboard";
import NRGameOverElements from "../components/NoRepeatGame/NRGameOverElements";
import NRGameWonElements from "../components/NoRepeatGame/NRGameWonElements";
import NRCardsWrapper from "../components/NoRepeatGame/NRCardsWrapper";

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

const NoRepeatGame = () => {
    const [score, setScore] = useState(0);
    const [hiScore, setHiScore] = useState(0);
    const [wordsArray, setWordsArray] = useState(getArrayOfWords(16));
    const [alreadyClicked, setAlreadyClicked] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [lastClickedWord, setLastClickedWord] = useState("");
    const [isGameWon, setIsGameWon] = useState(false);
    const [muted, setMuted] = useState(false);

    const successSound = new Howl({
        src: [succ808],
    });

    const failSound = new Howl({
        src: [fail808],
    });

    useEffect(() => {
        Howler.mute(false);
        Howler.volume(0.25);

        const storedHiScores = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_HISCORE));
        if (storedHiScores && storedHiScores.NR) {
            setHiScore(storedHiScores.NR);
        }
    }, []);

    useEffect(() => {
        if (hiScore !== 0) {
            const storedHiScores = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_HISCORE));

            if (storedHiScores) {
                localStorage.setItem(
                    LOCALSTORAGE_KEY_HISCORE,
                    JSON.stringify({
                        ...storedHiScores,
                        NR: hiScore,
                    })
                );
                return;
            }

            localStorage.setItem(
                LOCALSTORAGE_KEY_HISCORE,
                JSON.stringify({
                    NR: hiScore,
                })
            );
        }
    }, [hiScore]);

    const handleClick = (word) => {
        if (alreadyClicked.includes(word)) {
            console.log("Lose and restart");
            failSound.play();
            setIsGameOver(true);
            setLastClickedWord(word);
        } else {
            successSound.play();
            setScore((prevScore) => prevScore + 1);
            setHiScore((prevHiScore) => Math.max(hiScore + 1, prevHiScore));
            setWordsArray(shuffle([...wordsArray]));
            setAlreadyClicked([...alreadyClicked, word]);

            if (wordsArray.length === alreadyClicked.length + 1) {
                setIsGameWon(true);
            }
        }
    };

    const restartGame = () => {
        setScore(0);
        setWordsArray(getArrayOfWords(16));
        setAlreadyClicked([]);
        setIsGameOver(false);
        setIsGameWon(false);
    };

    const muteSound = () => {
        setMuted((prevMuted) => !prevMuted);

        if (muted) {
            Howler.mute(true);
        } else {
            Howler.mute(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box className="NO-REPEAT">
                <Container>
                    <Box alignItems="center" justifyContent="center">
                        <Stack justifyContent="center" alignItems="center">
                            <SSNav muted={muted} muteSound={muteSound} />
                            <NRHeadings />
                            <NRScoreboard score={score} hiScore={hiScore} />

                            <NRCardsWrapper>
                                {!isGameWon &&
                                    wordsArray.map((word) => {
                                        const bool = alreadyClicked.includes(word);

                                        return (
                                            <NRCards
                                                key={`00x${word}`}
                                                word={word}
                                                onClick={handleClick}
                                                isGameOver={isGameOver}
                                                isAlreadyClicked={bool}
                                            />
                                        );
                                    })}
                            </NRCardsWrapper>

                            {isGameOver && (
                                <NRGameOverElements
                                    lastClickedWord={lastClickedWord}
                                    restartGame={restartGame}
                                />
                            )}

                            {isGameWon && (
                                <NRGameWonElements restartGame={restartGame} />
                            )}
                        </Stack>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default NoRepeatGame;
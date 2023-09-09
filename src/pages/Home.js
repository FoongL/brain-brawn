import { Box, Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Banner from "../components/Home/Banner";
import HomeLogo from "../components/Home/HomeLogo";
import HomeHeadings from "../components/Home/HomeHeadings";

const LOCALSTORAGE_KEY_HISCORE = "hiScores";

const Home = () => {
  const [hiScores, setHiScores] = useState({
    NR: 0,
    NG: 0,
    WG: 0,
    SS: 0,
  });

  useEffect(() => {
    const storedHiScores = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY_HISCORE));
    if (storedHiScores) {
      const newObj = {
        NR: 0,
        NG: 0,
        WG: 0,
        SS: 0,
      };

      for (let key in storedHiScores) {
        newObj[key] = storedHiScores[key];
      }
      setHiScores(newObj);
    }
  }, []);

  return (
    <>
      <Box component="section" bgcolor={"#E3E3E3"} pt={"5vh"} pb={"5vh"}>
        <Container>
          <Stack component="section" className="fl-col fl-centered" textAlign={"center"} spacing={2}>
            <HomeLogo />
            <HomeHeadings />
          </Stack>
        </Container>
      </Box>
      <Container>
        <Stack component="section" id="games" spacing={3} my={5}>
          <Link to={"word-game"}>
            <Banner className="red HOME-btns" color="#70044B" hiScore={hiScores.WG}>
              Seen it?
            </Banner>
          </Link>
          <Link to={"no-repeat-game"}>
            <Banner className="orange HOME-btns" color="#706804" hiScore={hiScores.NR}>
              Repeat: null
            </Banner>
          </Link>
          <Link to={"number-game"}>
            <Banner className="green HOME-btns" color="#047018" hiScore={hiScores.NG}>
              Numbrrr
            </Banner>
          </Link>
          <Link to={"simon-says"}>
            <Banner className="blue HOME-btns" color="#044C70" hiScore={hiScores.SS}>
              Simone Sez
            </Banner>
          </Link>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
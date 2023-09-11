import React from "react";
import "./App.css";

import SimonSaysGame from "./pages/SimonSaysGame";
import NumberGame from "./pages/NumberGame";
import WordGame from "./pages/WordGame";
import NoRepeatGame from "./pages/NoRepeatGame";
import Home from "./pages/Home";

import { Navigate, Route, Routes } from "react-router-dom";

import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import ErrorPage from "./pages/ErrorPage";

let theme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
});
theme = responsiveFontSizes(theme);

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <BrowserRouter> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="simon-says" element={<SimonSaysGame />} />
            <Route path="word-game" element={<WordGame />} />
            <Route path="number-game" element={<NumberGame />} />
            <Route path="no-repeat-game" element={<NoRepeatGame />} />

            <Route path="error404" element={<ErrorPage />} />

            <Route path="*" element={<Navigate to="/error404" replace />} />
          </Routes>
        {/* </BrowserRouter> */}
      </div>
    </ThemeProvider>
  );
};

export default App;

import { Howl } from "howler";
import React, { useEffect, useState } from "react";
import { timeout } from "../../utils";

import xyloSounds from "../../assets/sounds/xylo/xyloSounds.mp3";

const SSButton = ({
  id,
  toLightUp,
  onCheckCorrectInput,
  isGameOver,
  lastLight,
  isDisabled,
}) => {
  const [isLitUp, setIsLitUp] = useState(false);
//   const [computerClicked, setComputerClicked] = useState(false);
//   const [buttonToLight, setButtonToLight] = useState(toLightUp);

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

  //   useEffect(()=>{

  //     console.log('hello')
  //     console.log('to light up:', toLightUp)
  //   },[toLightUp])

  useEffect(() => {
    // console.log('can i see this?')
    // console.log('id:', id, toLightUp)
    if (toLightUp[0] !== id.toString()) {
      return;
    }
    console.log("lighting up:", toLightUp);
    computerClick();
    console.log("Being called in children");
  }, [toLightUp]);

  const computerClick = async () => {
    setIsLitUp(true);
    // setComputerClicked(true);
    // await lightUpFor(500);
  };

  useEffect(() => {
    if (isLitUp) {
      const hold = async () => {
        await timeout(500);
        setIsLitUp(false);
        //setComputerClicked(false);
      };
      hold();
    } 
  }, [isLitUp]);

  const lightUpFor = async (timing) => {
    setIsLitUp(true);
    await setTimeout(() => {
      setIsLitUp(false);
    }, timing);
  };

  const userHandleClick = async () => {
    console.log('i am in here now')
    xyloSound.play(`xylo${id + 1}`);
    await lightUpFor(200);
    await onCheckCorrectInput(id);
  };

  let bgColor, borderStyle;
  if (!isGameOver) {
    if (isLitUp) {
      bgColor = "#EAF6E7";
      borderStyle = "0";
    } else {
      bgColor = "#0A71E1";
      borderStyle = "0";
    }
  } else {
    if (lastLight === id) {
      bgColor = "#EAF6E7";
      borderStyle = "0";
    } else {
      bgColor = "rgb(11, 125, 175, 0.6)";
      borderStyle = "4px solid white";
    }
  }

  return (
    <button
      style={{
        width: "150px",
        height: "150px",
        backgroundColor: bgColor,
        border: borderStyle,
        borderRadius: "7px",
      }}
      onClick={userHandleClick}
      disabled={isDisabled ? true : false}
    >
      {isGameOver && lastLight === id && (
        <>
          <p>it was me</p>
          <p>i was next</p>
        </>
      )}
    </button>
  );
};

export default SSButton;

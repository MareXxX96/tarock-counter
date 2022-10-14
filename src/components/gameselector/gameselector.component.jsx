import { Box, Button, Grid, Typography, Stack } from "@mui/material";
import React, {useState}from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SModalOverlay,
  SModalWrapper,
  SModal,
  SHeader,
  STitle,
  SButton,
  SDescription,
} from "../modal/modal.styles";

import { selectModalPage, selectModalVisibility } from "../../store/modal/modal.selector"; 
import { setModalPage, setVisible } from "../../store/modal/modal.action";
import {
  selectGameRounds,
  selectGameRoundCount,
} from "../../store/game/game.selector";

import { setCurrentGameRound } from "../../store/game/game.action";

export const GameType = {
  solo: "solo",
  besserrufer: "besserrufer",
  dreier: "dreier",
  farbiger: "farbiger",
  solodreier: "solodreier",
  rufer: "rufer",
  piccolo: "piccolo",
  bettler: "bettler",
};

const GameSelector = () => {

  const [selectButtonActive, toggleSelectButton] = useState(false)
  const [gameSelected, setGameSelected] = useState("");
  const gameRounds = useSelector(selectGameRounds);
  const gameRoundCount = useSelector(selectGameRoundCount);

  const selectGame = (event) => {

    if(selectButtonActive === true) {
      setGameSelected("")
      toggleSelectButton(false)
      console.log(gameSelected)
      event.target.style.border = "0px";
      return
    }
    toggleSelectButton(true)
    const gameToAdd = event.currentTarget.id
    setGameSelected(gameToAdd)
    event.target.style.border = "2px solid lightblue";

  };

  const addGameToRound = () => {

    const currentGameRound = gameRounds[gameRoundCount];
    
    currentGameRound.roundType = gameSelected
    
    switch (gameSelected) {
      case "solo" : 
        currentGameRound.gameValue = 0.2;
        break;
      case "besserrufer": 
        currentGameRound.gameValue = 0.2;
        break;
      case "dreier": 
        currentGameRound.gameValue = 0.5;
        break;
      case "farbiger": 
        currentGameRound.gameValue = 0.5;
        break;
      case "solodreier": 
        currentGameRound.gameValue = 1;
        break;
      case "rufer": 
        currentGameRound.gameValue = 0.1;
        break;
      case "piccolo": 
        currentGameRound.gameValue = 0.3;
        break;
      case "bettler": 
        currentGameRound.gameValue = 0.4;
        break;
    }
    if (currentGameRound.doppelt === true) {
      currentGameRound.gameValue = currentGameRound.gameValue * 2
    }
    console.log(currentGameRound)
    gameRounds.splice([gameRoundCount],1,currentGameRound)
    dispatch(setCurrentGameRound(gameRounds))

  };

  const nextPage = () => {

    if (gameSelected.length == 0) {
      alert("Bitte Spiel hinzufügen");
      return
    } 
    addGameToRound()
    dispatch(setModalPage(1))
  }


    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(setVisible(false))

    }
    // const changeToPage2 = () => {
    //     changePage(1)
    //     console.log(modalScreen)
    // }

  return (
    <>
      <SModalOverlay />
      <SModalWrapper
        aria-modal={true}
        aria-hidden={true}
        tabIndex={-1}
        role="dialog"
      >
        <SModal>
          <Stack spacing={20} direction={"row"}>
            <Button onClick={closeModal}>Zurück</Button>
            <Button onClick={nextPage}>Weiter</Button>
          </Stack>
          <SHeader>
            <STitle>Neue Runde</STitle>
            {/* <SDescription>
              Why this modal has popped up
            </SDescription> */}
          </SHeader>
          <Stack
            display={"flex"}
            flexWrap={"wrap"}
            flexDirection={"row"}
          >
            {Object.keys(GameType).map((key) => {
              
              return <Button
                sx={{
                  width: "50%",
                  minWidth: { sm: "100px", md: "250px" },
                  minHeight: "100px",
                }}
                onClick={selectGame}
                id={key}
              >
                {key}
              </Button>;
            })}
          </Stack>

        </SModal>
      </SModalWrapper>
    </>
  );
};

export default GameSelector;

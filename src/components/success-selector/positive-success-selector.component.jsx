import { Box, Button, Grid, Typography, Stack } from "@mui/material";
import React, { useState } from "react";
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

import {
  selectModalPage,
  selectModalVisibility,
} from "../../store/modal/modal.selector";
import { setModalPage, setVisible } from "../../store/modal/modal.action";
import {
  selectGameRounds,
  selectGameRoundCount,
} from "../../store/game/game.selector";

import { setCurrentGameRound, setGameRoundCount } from "../../store/game/game.action";
import { selectPlayersArray } from "../../store/players/players.selector";
import { updatePlayersArray } from "../../store/players/players.action";

const PositiveSuccessSelector = () => {
  const gameRounds = useSelector(selectGameRounds);
  const gameRoundCount = useSelector(selectGameRoundCount);
  const allPlayers = useSelector(selectPlayersArray)

  const [gameSelected, setGameSelected] = useState(true)

  const currentGameRound = gameRounds[gameRoundCount];

  const toggleAnsage = (event) => {
    
    const ausgewaehlteAnsage = currentGameRound.ansagen.findIndex(
      (ansage) => ansage.title === event.currentTarget.id
    );

    currentGameRound.ansagen[ausgewaehlteAnsage].successful = !currentGameRound.ansagen[ausgewaehlteAnsage].successful

    if(currentGameRound.ansagen[ausgewaehlteAnsage].successful === true) {
        event.target.style.border = "1px solid green";
        event.target.style.color = "green"
    } else {
        event.target.style.border = "1px solid red";
        event.target.style.color = "red"
    }
    
    console.log(currentGameRound.ansagen[ausgewaehlteAnsage])
  };

  const dispatch = useDispatch();

  const changeButton = () => {
    setGameSelected(!gameSelected)
  };

  const assignPlayerPoints = () => {
    let allPlayerIDs = allPlayers.map(a => a.id);
    let activePlayerIDs = currentGameRound.activePlayers.map(a => a.id)
    let intersection = allPlayerIDs.filter(element => activePlayerIDs.includes(element));
    let difference = allPlayerIDs.filter(element => !activePlayerIDs.includes(element));
    let allPlayersBefore = JSON.parse(JSON.stringify(allPlayers))
    let amountChanges = {}


    if (gameSelected === true) {
        switch (intersection.length) {
            case 1 : 
            intersection.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + (currentGameRound.gameValue*3))*100)/100)
            difference.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - currentGameRound.gameValue)*100)/100)
                break;
            case 2 : 
            intersection.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + currentGameRound.gameValue)*100)/100)
            difference.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - currentGameRound.gameValue)*100)/100)
                break;
            case 3 : 
            intersection.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + currentGameRound.gameValue)*100)/100)
            difference.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - (currentGameRound.gameValue*3))*100)/100)
        }
    } else {
        switch (intersection.length) {
            case 1 : 
            intersection.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - (currentGameRound.gameValue*3))*100)/100)
            difference.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + currentGameRound.gameValue)*100)/100)
                break;
            case 2 : 
            intersection.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - currentGameRound.gameValue)*100)/100)
            difference.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + currentGameRound.gameValue)*100)/100)
                break;
            case 3 : 
            intersection.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - currentGameRound.gameValue)*100)/100)
        difference.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + (currentGameRound.gameValue*3))*100)/100)
        } 
    } 
    
    currentGameRound.ansagen.map((ansage) => {
        let ansagePlayerIDs = ansage.player.map(a => a.id)
        let intersectionAnsage = allPlayerIDs.filter(element => ansagePlayerIDs.includes(element));
        let differenceAnsage = allPlayerIDs.filter(element => !ansagePlayerIDs.includes(element));
        if (ansage.successful === true) {
            switch (intersectionAnsage.length) {
                case 1 : 
                    intersectionAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + (ansage.value * 3))* 100)/100)
                    differenceAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - ansage.value)*100)/100)
                    break;
                case 2 : 
                    intersectionAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + ansage.value)*100)/100)
                    differenceAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - ansage.value)*100)/100)
                    break;
                case 3 : 
                intersectionAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + ansage.value)*100)/100)
                differenceAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - (ansage.value * 3))*100)/100)
            }
        } else {
            switch (intersectionAnsage.length) {
                case 1 : 
                    intersectionAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - (ansage.value * 3))*100)/100)
                    differenceAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + ansage.value)*100)/100)
                    break;
                case 2 : 
                    intersectionAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - ansage.value)*100)/100)
                    differenceAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + ansage.value)*100)/100)
                    break;
                case 3 : 
                intersectionAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - ansage.value)*100)/100)
                differenceAnsage.map((i) => allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + (ansage.value * 3))*100)/100)
            }
        }
    })
    
    
    allPlayersBefore.map((pBefore) => {
      let result = allPlayers.filter(element => element.id === pBefore.id);
      console.log(result)
      let amountAdded = Math.round((result[0].currentBalance - pBefore.currentBalance)*100)/100
      amountChanges[pBefore.name] = amountAdded
    })

    console.log(allPlayersBefore)
    console.log(amountChanges)

    currentGameRound.amountChanges = amountChanges
    console.log(currentGameRound)
    console.log(allPlayers)
    dispatch(updatePlayersArray(allPlayers))
    gameRounds.splice([gameRoundCount], 1, currentGameRound);
    dispatch(setCurrentGameRound(gameRounds));
    dispatch(setVisible(false))
    dispatch(setModalPage(0))
    //addgameround
    dispatch(setGameRoundCount(gameRoundCount + 1));
  }

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
            <Button
              onClick={() => {
                dispatch(setModalPage(2));
              }}
            >
              Zurück
            </Button>
            <Button onClick={assignPlayerPoints}>Weiter</Button>
          </Stack>
          <SHeader>
            <STitle>Erfolge</STitle>
            {/* <SDescription>
              Why this modal has popped up
            </SDescription> */}
          </SHeader>
          <Stack
            display={"flex"}
            flexWrap={"wrap"}
            flexDirection={"column"}
          >
            
            <Button color={gameSelected ? "success" : "error"} sx={{border:1}} onClick={changeButton}>Spiel: {currentGameRound.roundType} | Wert: {currentGameRound.gameValue}</Button>
            {currentGameRound.ansagen.map((ansage) => {
                return <Button key={ansage.title} color={ansage.successful ? "success" : "error"} id={ansage.title} sx={{border:1, marginTop:2}} onClick={toggleAnsage}>{ansage.title} | Wert: {ansage.value}</Button>
                
            })}
          </Stack>
        </SModal>
      </SModalWrapper>
    </>
  );
};

export default PositiveSuccessSelector;

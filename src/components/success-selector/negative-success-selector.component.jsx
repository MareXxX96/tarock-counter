import { Box, Button, Grid, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
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

const NegativeSuccessSelector = () => {
  const gameRounds = useSelector(selectGameRounds);
  const gameRoundCount = useSelector(selectGameRoundCount);
  const allPlayersToCopy = JSON.stringify(useSelector(selectPlayersArray));
  const allPlayers = JSON.parse(allPlayersToCopy)

  const currentGameRoundToCopy = gameRounds[gameRoundCount];
  const currentGameRound = {...currentGameRoundToCopy}

  const toggleAnsage = (event) => {
    currentGameRound.negativeGames[event.target.id].success =
      !currentGameRound.negativeGames[event.target.id].success;

    if (currentGameRound.negativeGames[event.target.id].success === true) {
      event.target.style.border = "1px solid green";
      event.target.style.color = "green";
    } else {
      event.target.style.border = "1px solid red";
      event.target.style.color = "red";
    }

    console.log(currentGameRound.negativeGames[event.target.id]);
  };

  const dispatch = useDispatch();

  const assignPlayerPoints = () => {

    let negativeGames = currentGameRound.negativeGames
    let amountChanges = {}
    const allPlayersBefore = JSON.parse(JSON.stringify(allPlayers))

    currentGameRound.negativeGames.map((game) => {
      const activeplayerID = game.player.id;
      const opponentPlayers = game.opponentPlayersWithValue
      const passivePlayerIDs = opponentPlayers.map(e => e.id)
      

      let sumUpValue = opponentPlayers.reduce(
        (acc, nr) => acc + nr.value,
        0
      );

      if (game.success === true) {
        allPlayers[activeplayerID].currentBalance = Math.round((allPlayers[activeplayerID].currentBalance + sumUpValue)*100)/100;
        passivePlayerIDs.map((i) => {
          const relevantPlayer = opponentPlayers.find((opponent) => (opponent.id === i));
          allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance - relevantPlayer.value)*100)/100;
        });
        
      } else {
        allPlayers[activeplayerID].currentBalance = Math.round((allPlayers[activeplayerID].currentBalance - sumUpValue)*100)/100;
        passivePlayerIDs.map((i) => {
          const relevantPlayer = opponentPlayers.find((opponent) => (opponent.id === i));
          allPlayers[i].currentBalance = Math.round((allPlayers[i].currentBalance + relevantPlayer.value)*100)/100;
        });
        
      }
    });

    allPlayersBefore.map((pBefore) => {
      let result = allPlayers.filter(element => element.id === pBefore.id);
      console.log(result)
      let amountAdded = Math.round((result[0].currentBalance - pBefore.currentBalance)*100)/100
      amountChanges[pBefore.name] = amountAdded
    })

    // allPlayers.map((i) => i.currentBalance = 0)
    currentGameRound.amountChanges = amountChanges
    gameRounds.splice([gameRoundCount], 1, currentGameRound);
    dispatch(setCurrentGameRound(gameRounds));
    dispatch(updatePlayersArray(allPlayers))
    dispatch(setVisible(false))
    dispatch(setModalPage(0))
    //addgameround
    dispatch(setGameRoundCount(gameRoundCount + 1));
  };

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
                dispatch(setModalPage(4));
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
          <Stack display={"flex"} flexWrap={"wrap"} flexDirection={"column"}>
            {currentGameRound.negativeGames.map((game, index) => {
              return (
                <Button
                  key={index}
                  color={game.success ? "success" : "error"}
                  id={index}
                  sx={{ border: 1, marginTop: 2 }}
                  onClick={toggleAnsage}
                >
                  {game.type} | {game.player.name} | {game.opponentPlayersWithValue[0].id} | {game.opponentPlayersWithValue[1].id} | {game.opponentPlayersWithValue[2].id}
                </Button>
              );
            })}
          </Stack>
          {console.log(currentGameRound.negativeGames)}
        </SModal>
      </SModalWrapper>
    </>
  );
};

export default NegativeSuccessSelector;
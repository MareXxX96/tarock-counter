import { Box, Button, Grid, Typography, Stack } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../modal/Modal";

import { selectPlayersArray } from "../../store/players/players.selector";

import {
  setGameRoundCount,
  setGameRoundItems,
  deleteAllRounds,
  setFahrenRoundItems,
} from "../../store/game/game.action";
import {
  selectGameRoundCount,
  selectGameRounds,
} from "../../store/game/game.selector";

import {
  selectModalPage,
  selectModalVisibility,
} from "../../store/modal/modal.selector";
import { setVisible, setModalPage } from "../../store/modal/modal.action";
import {
  deleteAllPlayers,
  setPlayersIdCounter,
} from "../../store/players/players.action";

//game
const createGameRound = (id, doppelt) => ({
  id: id,
  activePlayers: [],
  passivePlayers: [],
  doppelt: doppelt,
  amountChanges: {},
  ansagen: [],
});

const TestGrid = () => {
  const dispatch = useDispatch();

  //game
  const roundCount = useSelector(selectGameRoundCount);
  const gameRounds = useSelector(selectGameRounds);

  //modal
  const modalVisibility = useSelector(selectModalVisibility);
  const modalPage = useSelector(selectModalPage);

  //players
  const playersArray = useSelector(selectPlayersArray);

  //useState and useEffect to create round-details popup states on render
  const [popupStates, setPopupStates] = useState([
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
    { opened: false },
  ]);

  // const fahrenRound = (startingRound) => {

  //   const plannedRounds = [
  //     { id: startingRound, activePlayers: [], passivePlayers: [], doppelt: doppelt, amountChanges: {}, ansagen: [] },
  //     { id: startingRound+1, activePlayers: [], passivePlayers: [], doppelt: doppelt, amountChanges: {}, ansagen: [] },
  //     { id: startingRound+2, activePlayers: [], passivePlayers: [], doppelt: doppelt, amountChanges: {}, ansagen: [] },
  //     { id: startingRound+3, activePlayers: [], passivePlayers: [], doppelt: doppelt, amountChanges: {}, ansagen: [] },
  //     { id: startingRound+4, activePlayers: [], passivePlayers: [], doppelt: doppelt, amountChanges: {}, ansagen: [] },
  //   ]

  //   // let allPlayerIDs = allPlayers.map(a => a.id);
  //   // let activePlayerIDs = currentGameRound.activePlayers.map(a => a.id)
  //   // let intersection = allPlayerIDs.filter(element => activePlayerIDs.includes(element));
  //   // let difference = allPlayerIDs.filter(element => !activePlayerIDs.includes(element));
  //   // let allPlayersBefore = JSON.parse(JSON.stringify(allPlayers))

  //   };

  const countRound = () => {
    if (!gameRounds[roundCount]) {
      const newRound = createGameRound(roundCount, false);
      dispatch(setGameRoundItems(gameRounds, newRound));
    }
    dispatch(setVisible(true));
  };

  const newGame = () => {
    dispatch(deleteAllRounds());
    dispatch(setGameRoundCount(0));
    dispatch(deleteAllPlayers());
    dispatch(setPlayersIdCounter(0));
  };

  // neuer Code - testen Gedankenanstoß

  const createFahren = () => {
    let arraytoAdd = [];
    if (!gameRounds[roundCount]) {
      const newRound = createGameRound(roundCount, false);
      arraytoAdd.push(newRound);
      // dispatch(setGameRoundItems(gameRounds, newRound));
    }

    for (let i = 1; i < 5; i++) {
      let count = roundCount + i;
      if (!gameRounds[count]) {
        let nRound = createGameRound(count, true);
        arraytoAdd.push(nRound);
        console.log(`round ${i} created`);
      }
    }
    console.log(gameRounds);
    console.log(arraytoAdd);
    dispatch(setFahrenRoundItems(gameRounds, arraytoAdd));

    dispatch(setModalPage(6));
    dispatch(setVisible(true));
  };

  const handleDetailInfoClick = (event) => {
    let temporaryStates = [...popupStates];
    temporaryStates[event.target.id].opened =
      !temporaryStates[event.target.id].opened;
    setPopupStates(temporaryStates);
  };

  return (
    <Box m={2} pt={3}>
      {roundCount > 0 ? (
        <Grid
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          paddingTop={5}
        >
          <Button>Aktueller Stand</Button>
        </Grid>
      ) : (
        <></>
      )}

      <Grid
        container
        rowSpacing={2}
        justifyContent="center"
        alignItems={"center"}
      >
        {playersArray.map((player) => {
          return (
            <Grid key={player.id} item xs={3} s={2} md={2}>
              <Typography sx={{ margin: 2, textAlign: "center" }}>
                {player.name}
              </Typography>
              <Typography sx={{ border: 1, textAlign: "center" }}>
                {player.currentBalance}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
      <br />

      <Typography align="center">
        <Button sx={{ padding: 2 }} onClick={countRound}>
          Runde hinzufügen
        </Button>
        <Button sx={{ padding: 2 }} onClick={newGame}>
          Neues Spiel starten
        </Button>
        <Button sx={{ padding: 2 }} onClick={createFahren}>
          Fahren
        </Button>
        <Button
          sx={{ padding: 2 }}
          onClick={() => {
            dispatch(setModalPage(7));
            dispatch(setVisible(true));
          }}
        >
          Spieler hinzufügen
        </Button>
      </Typography>

      {roundCount > 0 ? (
        <Typography
          align="center"
          paddingTop={5}
          margin={3}
          borderTop={2}
          fontWeight={600}
        >
          Letzte Runden
        </Typography>
      ) : (
        <></>
      )}

      {gameRounds.map((round, index) => {
        // newGame()
        return (
          <Grid
            container
            direction={"column"}
            marginTop={2}
            paddingTop={0}
            rowSpacing={0}
            justifyContent="center"
            alignItems={"center"}
          >
            <Grid
              justifyContent="center"
              alignItems={"center"}
              marginTop={0}
              item
              xs={0.8}
              s={2}
              md={2}
            >
              <Button id={index} onClick={handleDetailInfoClick}>
                {index + 1}. Runde - Details
              </Button>
              {popupStates[index].opened ? (
                <Typography
                  fontSize={12}
                  sx={{ margin: 2, textAlign: "center" }}
                >
                  {round.roundType}{" "}
                  {round.ansagen.map((ansage) => {
                    if (ansage.successful) {
                      return `| ${ansage.title} (Wert: ${
                        ansage.value
                      }€) von ${ansage.player.map(
                        (player) => player.name
                      )} geschafft `;
                    } else {
                      return `| ${ansage.title} (Wert: ${
                        ansage.value
                      }€) von ${ansage.player.map(
                        (player) => player.name
                      )} nicht geschafft`;
                    }
                  })}
                </Typography>
              ) : (
                <></>
              )}
            </Grid>
            <Grid
              container
              direction={"row"}
              marginTop={0}
              marginBottom={3}
              paddingTop={0}
              rowSpacing={0}
              justifyContent="center"
              alignItems={"center"}
            >
              {Object.keys(round.amountChanges).map((key) => {
                return (
                  <Grid key={key} marginTop={0} item xs={2.8} s={2} md={2}>
                    <Typography sx={{ margin: 2, textAlign: "center" }}>
                      {key}
                    </Typography>
                    <Typography sx={{ border: 1, textAlign: "center" }}>
                      {round.amountChanges[key]}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        );
      })}

      <Modal isVisible={modalVisibility} />
    </Box>
  );
};

export default TestGrid;

import { Button, Stack, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { Player } from "../../store/players/players.reducer";

import {
  selectPlayersIdCounter,
  selectPlayersArray,
} from "../../store/players/players.selector";
import {
  setPlayersIdCounter,
  setPlayersArray,
  deleteAllPlayers,
} from "../../store/players/players.action";
import {
  selectGameRounds,
  selectGameRoundCount,
} from "../../store/game/game.selector";

import { setCurrentGameRound } from "../../store/game/game.action";

import {
  SModalOverlay,
  SModalWrapper,
  SModal,
  SHeader,
  STitle,
} from "../modal/modal.styles";

import { setModalPage } from "../../store/modal/modal.action";

const PlayerSelector = () => {
  //Buttonselect
  const ref = useRef(null);
  const textInput = useRef(null);

  //

  const dispatch = useDispatch();

  const [newPlayerName, setNewPlayerName] = useState("");
  const [addPlayerIsShown, setAddPlayerIsShown] = useState(false);
  const [playersSelected, setPlayersSelected] = useState([]);
  const gameRounds = useSelector(selectGameRounds);
  const gameRoundCount = useSelector(selectGameRoundCount);

  const idCount = useSelector(selectPlayersIdCounter);
  const playersArray = useSelector(selectPlayersArray);

  const currentGameRound = gameRounds[gameRoundCount];

  const deleteAllPlayersAndResetID = () => {
    dispatch(deleteAllPlayers());
    dispatch(setPlayersIdCounter(0));
    setPlayersSelected([]);
  };

  const selectPlayer = (event) => {
    const playerToAdd = playersArray.find(
      (player) => player.id === parseInt(event.currentTarget.id)
    );

    const alreadyAddedIndex = playersSelected.findIndex(
      (player) => player.id === playerToAdd.id
    );

    if (alreadyAddedIndex === -1) {
      const newPlayersArray = playersSelected.concat([playerToAdd]);
      setPlayersSelected(newPlayersArray);
      event.target.style.border = "2px solid lightblue";
    } else {
      playersSelected.splice(alreadyAddedIndex, 1);
      event.target.style.border = "0px";
    }
  };

  const addPlayersToRound = () => {
    console.log(currentGameRound);

    currentGameRound.activePlayers = playersSelected;

    if (playersSelected.length == 1) {
      const passivePlayers = playersArray.filter(
        (p) => p.id !== playersSelected[0].id
      );
      currentGameRound.passivePlayers = passivePlayers;
      console.log(currentGameRound);
      gameRounds.splice([gameRoundCount], 1, currentGameRound);
      dispatch(setCurrentGameRound(gameRounds));
    } else if (playersSelected.length == 2) {
      const p = playersArray.filter((p) => p.id !== playersSelected[0].id);

      const passivePlayers = p.filter((q) => q.id !== playersSelected[1].id);

      currentGameRound.passivePlayers = passivePlayers;
      gameRounds.splice([gameRoundCount], 1, currentGameRound);
      dispatch(setCurrentGameRound(gameRounds));
    } else {
      const p = playersArray.filter((p) => p.id !== playersSelected[0].id);

      const p2 = p.filter((q) => q.id !== playersSelected[1].id);

      const passivePlayers = p2.filter((r) => r.id !== playersSelected[2].id);

      currentGameRound.passivePlayers = passivePlayers;
    }
  };

  const addNegativeGames = () => {
    let negativeGames = [];

    playersSelected.map((play) => {
      const x = JSON.stringify(playersArray)
      const newPlayersArray = JSON.parse(x)
      let opponentPlayers = newPlayersArray.filter(
        (player) => player.id !== play.id
      );
      opponentPlayers.forEach((element) => {
        element.value = currentGameRound.gameValue;
      });

      let gameToAdd = {
        type: currentGameRound.roundType,
        player: play,
        opponentPlayersWithValue: opponentPlayers,
        success: true,
      };

      negativeGames.push(gameToAdd);
    });
    console.log(negativeGames)
    console.log(playersArray)
    currentGameRound.negativeGames = negativeGames;
  };

  const nextPage = () => {
    if (playersSelected.length == 0) {
      alert("Bitte Spieler hinzufügen");
      return;
    }
    addPlayersToRound();

    switch (currentGameRound.roundType) {
      case "piccolo":
      case "bettler":
        {
          addNegativeGames();
          gameRounds.splice([gameRoundCount], 1, currentGameRound);
          dispatch(setCurrentGameRound(gameRounds));
          dispatch(setModalPage(4));
        }
        break;
      default: {
        gameRounds.splice([gameRoundCount], 1, currentGameRound);
        dispatch(setCurrentGameRound(gameRounds));
        dispatch(setModalPage(2));
      }
    }
  };


 const keyPress = (e) => {
  if(e.keyCode == 13){
    createPlayer()
    textInput.current.value = "";
  }
 }

  const createPlayer = () => {
    if (newPlayerName.length) {
      const newPlayer = Player(idCount, newPlayerName, 0);
      dispatch(setPlayersArray(playersArray, newPlayer));
      dispatch(setPlayersIdCounter(idCount + 1));
      textInput.current.value = "";
    } else {
      alert("Please enter player name");
    }
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
                dispatch(setModalPage(0));
              }}
            >
              Zurück
            </Button>
            <Button onClick={nextPage}>Weiter</Button>
          </Stack>
          <SHeader>
            <STitle>Spielerauswahl</STitle>
          </SHeader>
          <Stack display={"flex"} flexWrap={"wrap"} flexDirection={"row"}>
            {playersArray.length ? (
              Object.values(playersArray).map((key) => {
                return (
                  <Button
                    sx={{
                      width: "50%",
                      minWidth: { sm: "100px", md: "250px" },
                      minHeight: "100px",
                    }}
                    id={key.id}
                    onClick={selectPlayer}
                    ref={ref}
                  >
                    {key.name}
                  </Button>
                );
              })
            ) : (
              <h3>Keine Spieler vorhanden</h3>
            )}
          </Stack>
          <Stack direction={"row"}>
            <Button
              onClick={() => {
                setAddPlayerIsShown(!addPlayerIsShown);
              }}
            >
              {addPlayerIsShown ? "Erstellen beenden" : "Spieler erstellen"}
            </Button>
            <Button onClick={deleteAllPlayersAndResetID}>
              Alle Spieler entfernen
            </Button>
          </Stack>
          {addPlayerIsShown && (
            <Stack direction={"column"}>
              <TextField
                sx={{}}
                type="string"
                onChange={(value) => {
                  setNewPlayerName(value.target.value);
                }}
                id="playerAddField"
                label="Neuer Spieler"
                variant="standard"
                onKeyDown={keyPress}
                inputRef={textInput}
              />
              <Button onClick={createPlayer}>Spieler hinzufügen</Button>
            </Stack>
          )}
        </SModal>
      </SModalWrapper>
    </>
  );
};

export default PlayerSelector;

import { Button, Stack, TextField } from "@mui/material";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import {
  SModalOverlay,
  SModalWrapper,
  SModal,
  SHeader,
  STitle,
} from "../modal/modal.styles";

import { setModalPage, setVisible } from "../../store/modal/modal.action";

const PlayerCreator = () => {
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


  const nextPage = () => {
    dispatch(setVisible(false));
    dispatch(setModalPage(0))
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
            <Button/>
            <Button onClick={nextPage}>Fertig</Button>
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

export default PlayerCreator;
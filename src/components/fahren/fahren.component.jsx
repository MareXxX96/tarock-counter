import { Button, Stack, TextField, Box, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Picker } from "react-native";
import checkmarkIcon from "../../assets/CheckmarkIcon.svg";
import xIcon from "../../assets/XIcon.svg";

import {
  selectPlayersIdCounter,
  selectPlayersArray,
} from "../../store/players/players.selector";

import { updatePlayersArray } from "../../store/players/players.action";
import { setVisible } from "../../store/modal/modal.action";

import {
  selectGameRounds,
  selectGameRoundCount,
} from "../../store/game/game.selector";

import { setCurrentGameRound, setGameRoundCount } from "../../store/game/game.action";

import {
  SModalOverlay,
  SModalWrapper,
  SModal,
  SHeader,
  STitle,
} from "../modal/modal.styles";

import { setModalPage } from "../../store/modal/modal.action";

const Fahren = () => {
  const dispatch = useDispatch();

  const gameRounds = useSelector(selectGameRounds);
  const gameRoundCount = useSelector(selectGameRoundCount);

  const [selectedLosingPlayer, setSelectedLosingPlayer] = useState();
  const [selectedEngerlPlayer, setSelectedEngerlPlayer] = useState();

  const idCount = useSelector(selectPlayersIdCounter);
  const allPlayers = useSelector(selectPlayersArray);

  const currentGameRound = gameRounds[gameRoundCount];
  const [loser, setLoser] = useState(null);
  const [winner, setWinner] = useState(null);
  const [mitFahrer, setMitFahrer] = useState(0);
  const [selbstMit, setSelbstMit] = useState(false);
  const [ueber35, setUeber35] = useState(false);
  const [engerl, setEngerl] = useState(null);

  const handleMitfahrer = (type) => {
    if (type === "increase") {
      if (mitFahrer < 3) {
        setMitFahrer(mitFahrer + 1);
      }
    } else if (mitFahrer > 0) {
      setMitFahrer(mitFahrer - 1);
    }
  };

  const addToGame = () =>{

    let amountChanges = {}
    const allPlayersBefore = JSON.parse(JSON.stringify(allPlayers))

    let gameValue = 0.1

    ueber35 ? (
        gameValue *= 2
    ) : (
        gameValue = gameValue
    )

    selbstMit ? (
            gameValue = gameValue * 2 * (Math.pow(2, mitFahrer))
        ) : (
            gameValue = gameValue * (Math.pow(2, mitFahrer))
        )

    allPlayers.map((player) => {
    
        if (player.id == loser.id) {
            player.currentBalance -= Math.round((gameValue*3)*100)/100
        } else if (engerl == null){
            player.currentBalance += Math.round((gameValue)*100)/100
        } else if (player.id == engerl.id){
            player.currentBalance += Math.round((gameValue*3)*100)/100
        }

    })
    console.log(allPlayers)

    allPlayersBefore.map((pBefore) => {
        let result = allPlayers.filter(element => element.id === pBefore.id);
        console.log(result)
        console.log(pBefore)
        let amountAdded = Math.round((result[0].currentBalance - pBefore.currentBalance)*100)/100
        amountChanges[pBefore.name] = amountAdded
      })
  
      currentGameRound.amountChanges = amountChanges
      currentGameRound.roundType = `Fahren | Verlierer: ${loser.name} | Mitfahrer: ${mitFahrer}${selbstMit ? (" | Selbst Mitgefahren") : ("")}${ueber35 ? (" | Über 35") : ("")}`
      gameRounds.splice([gameRoundCount], 1, currentGameRound);
      dispatch(setCurrentGameRound(gameRounds));
      dispatch(updatePlayersArray(allPlayers))
      dispatch(setVisible(false))
      dispatch(setModalPage(0))
      //addgameround
      dispatch(setGameRoundCount(gameRoundCount + 1));
      console.log(currentGameRound)
      console.log(allPlayers)

  }

  const deleteFahren = () => {
    gameRounds.splice([gameRoundCount], 5)
    dispatch(setCurrentGameRound(gameRounds));
    dispatch(setModalPage(0));
    dispatch(setVisible(false));
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
              onClick={deleteFahren}
            >
              Zurück
            </Button>
            <Button onClick={addToGame}>Fertig</Button>
          </Stack>
          <SHeader>
            <STitle>Fahren</STitle>
          </SHeader>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Typography fontStyle={"italic"}>Verlierer</Typography>
            <Picker
              selectedValue={selectedLosingPlayer}
              onValueChange={(itemValue, itemIndex) => {
                setLoser(allPlayers[itemIndex - 1]);
                console.log(itemIndex);
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "40px",
                width:"300px",
                borderRadius: 5,
                color: "black"
              }}
            >
              <Picker.Item label="Bitte auswählen" value={0} />
              {allPlayers.map((player) => {
                return <Picker.Item key={player.id} label={player.name} value={player.id} />;
              })}
            </Picker>

            <Box
              flexDirection={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              marginTop={2}
              width={"300px"}
            >
              <Typography margin={2}>Mitfahrer</Typography>
              <Button
                sx={{
                  margin: "10px",
                  border: "1px solid #2196f3",
                  borderRadius: 10,
                  padding: "3px",
                  minWidth: 33,
                }}
                onClick={() => {
                  handleMitfahrer();
                }}
              >
                -
              </Button>
              <Typography>{mitFahrer}</Typography>
              <Button
                sx={{
                  margin: "10px",
                  border: "1px solid #2196f3",
                  borderRadius: 10,
                  padding: "3px",
                  minWidth: 33,
                }}
                onClick={() => {
                  handleMitfahrer("increase");
                }}
              >
                +
              </Button>
            </Box>
            <Box
              flexDirection={"row"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              marginTop={2}
            >
              <Button
                sx={{
                  borderRadius: 2,
                  border: 1,
                  color: "black",
                  width: "300px",
                  justifyContent: "space-between",
                  paddingLeft: "20px"
                }}
                onClick={() => {
                  setSelbstMit(!selbstMit);
                }}
              >
                <Typography fontSize={15}>Selbst mitgefahren</Typography>
                {selbstMit ? (
                  <Box
                    component="img"
                    margin={0.5}
                    marginLeft={2}
                    sx={{
                      height: 20,
                      width: 20,
                    }}
                    alt="The house from the offer."
                    src={checkmarkIcon}
                  />
                ) : (
                  <Box
                    component="img"
                    margin={0.5}
                    marginLeft={2}
                    color={"red"}
                    sx={{
                      height: 20,
                      width: 20,
                    }}
                    alt="The house from the offer."
                    src={xIcon}
                  />
                )}
              </Button>
            </Box>
            <Box
              flexDirection={"row"}
              display={"flex"}
              alignItems={"center"}
              marginTop={2}
            >
              <Button
                sx={{
                  borderRadius: 2,
                  border: 1,
                  color: "black",
                  width: "300px",
                  justifyContent: "space-between",
                  paddingLeft: "20px"
                }}
                onClick={() => {
                  setUeber35(!ueber35);
                }}
              >
                <Typography fontSize={15}>Über 35</Typography>
                {ueber35 ? (
                  <Box
                    component="img"
                    margin={0.5}
                    marginLeft={2}
                    sx={{
                      height: 20,
                      width: 20,
                    }}
                    src={checkmarkIcon}
                  />
                ) : (
                  <Box
                    component="img"
                    margin={0.5}
                    marginLeft={2}
                    color={"red"}
                    sx={{
                      height: 20,
                      width: 20,
                    }}
                    src={xIcon}
                  />
                )}
              </Button>
            </Box>
            <Box>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                marginTop={2}
                fontStyle={"italic"}
              >
                Engerl?
              </Typography>
              <Picker
                selectedValue={selectedEngerlPlayer}
                onValueChange={(itemValue, itemIndex) => {
                if(itemValue == -1) {
                    setEngerl(null)
                } else {
                    setEngerl(allPlayers[itemIndex - 1]);
                }}}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40px",
                    width:"300px",
                    borderRadius: 5,
                    color: "black"
                }}
              >
                <Picker.Item label="Kein Engerl" value={-1} />
                {allPlayers.map((player) => {
                  return <Picker.Item key={player.id} label={player.name} value={player.id} />;
                })}
              </Picker>
            </Box>
          </Box>
        </SModal>
      </SModalWrapper>
    </>
  );
};

export default Fahren;

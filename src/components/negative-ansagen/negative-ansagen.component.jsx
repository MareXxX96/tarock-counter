import {
  Button,
  Stack,
  TextField,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  SModal,
  SModalOverlay,
  SModalWrapper,
  SHeader,
  STitle,
} from "../modal/modal.styles";

import { setModalPage } from "../../store/modal/modal.action";
import { useEffect, useState } from "react";

import { selectPlayersArray } from "../../store/players/players.selector";

import { setCurrentGameRound } from "../../store/game/game.action";

import {
  selectGameRounds,
  selectGameRoundCount,
} from "../../store/game/game.selector";

import AnsageElement from "../ansage-element/ansage-element.component";

var initValues = {
  bagat: 0.2,
  uhu: 0.3,
  kakadu: 0.4,
  drull: 0.1,
  koenige: 0.1,
  ulti: 0.1,
  mond: 0.1,
};

const NegativeAnsagen = () => {
  const gameRounds = useSelector(selectGameRounds);
  const gameRoundCount = useSelector(selectGameRoundCount);

  const allPlayers = useSelector(selectPlayersArray);

  const currentGameRound = gameRounds[gameRoundCount];

  const [games, setGames] = useState(currentGameRound.negativeGames)

  useEffect(() => {
    
  }, [games]);

  const dispatch = useDispatch();

  const doubleValue = (event, index, playerIndex) => {
    let currentValue = games[index].opponentPlayersWithValue[playerIndex].value
    let newGamesArray = [...games]

    setTimeout(()=>{
      if(event.detail === 2) {
        newGamesArray[index].opponentPlayersWithValue[playerIndex].value = currentValue / 2
        setGames(newGamesArray)
 
      } else if (event.detail === 1) {
        newGamesArray[index].opponentPlayersWithValue[playerIndex].value = currentValue * 2
        setGames(newGamesArray)
      }
   },250)
    
  }

  const addAnsagenToRound = () => {
    
    currentGameRound.negativeGames = games;
    console.log(currentGameRound)
    gameRounds.splice([gameRoundCount], 1, currentGameRound);
    dispatch(setCurrentGameRound(gameRounds));

    dispatch(setModalPage(5));
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
                dispatch(setModalPage(1));
              }}
            >
              Zurück
            </Button>
            <Button onClick={addAnsagenToRound}>Weiter</Button>
          </Stack>
          <SHeader>
            <STitle>
              {currentGameRound.roundType.substring(0, 1).toUpperCase() +
                currentGameRound.roundType.substring(1)}
            </STitle>
          </SHeader>

          <Box flexDirection={"column"} textAlign={"center"} width={"50%"}>
            {games.map((game, index) => {
              return (
                <Box key={game.player.id + "box"} margin={3} border={1}>
                  <Typography key={game.player.id + "name"}>
                    Spieler:{" "}
                    {game.player.name.substring(0, 1).toUpperCase() +
                      game.player.name.substring(1)}
                  </Typography>
                  <Typography key={game.player.id + "spritzer"}>
                    gespritzt von
                  </Typography>
                  <Box direction={"row"} display={"inline-flex"}>
                    {game.opponentPlayersWithValue.map((player, playerIndex) => {
                      return <Box margin={1} bgcolor={"#add8e6"} >
                      <Button onClick={event => doubleValue(event, index, playerIndex)} id={player.id} key={player.name}>{player.name}</Button>
                      <Typography>{player.value}</Typography>
                      </Box>  
                    })}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </SModal>
      </SModalWrapper>
    </>
  );
};

export default NegativeAnsagen;

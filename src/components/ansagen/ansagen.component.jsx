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

const Ansagen = () => {
  const gameRounds = useSelector(selectGameRounds);
  const gameRoundCount = useSelector(selectGameRoundCount);

  const currentGameRound = gameRounds[gameRoundCount];

  if (currentGameRound.roundType === "solo") {
    initValues = {
      bagat: 0.4,
      uhu: 0.6,
      kakadu: 0.8,
      drull: 0.2,
      koenige: 0.2,
      ulti: 0.2,
      mond: 0.2,
    }} else {
      initValues = {
        bagat: 0.2,
        uhu: 0.3,
        kakadu: 0.4,
        drull: 0.1,
        koenige: 0.1,
        ulti: 0.1,
        mond: 0.1,
      }
  }
  if (currentGameRound.doppelt === true) {
    for (let key in initValues) {
        initValues[key] *= 2;
    }
  }

  const [bagatValue, setBagatValue] = useState({
    title: "bagat",
    value: initValues.bagat,
    player: null,
    successful: true,
  });
  const [uhuValue, setUhuValue] = useState({
    title: "uhu",
    value: initValues.uhu,
    player: null,
    successful: true,
  });
  const [kakaduValue, setKakaduValue] = useState({
    title: "kakadu",
    value: initValues.kakadu,
    player: null,
    successful: true,
  });
  const [drullValue, setDrullValue] = useState({
    title: "drull",
    value: initValues.drull,
    player: null,
    successful: true,
  });
  const [koenigeValue, setKoenigeValue] = useState({
    title: "koenige",
    value: initValues.koenige,
    player: null,
    successful: true,
  });
  const [ultiValue, setUltiValue] = useState({
    title: "ulti",
    value: initValues.ulti,
    player: null,
    successful: true,
  });
  const [mondValue, setMondValue] = useState({
    title: "mond",
    value: initValues.mond,
    player: null,
    successful: true,
  });

  const addAnsagenToRound = () => {
    let states = [
      bagatValue,
      uhuValue,
      kakaduValue,
      drullValue,
      koenigeValue,
      ultiValue,
      mondValue,
    ];
    let ansagenThisRound = [];
    states.map((state) => {
      if (state.player != null) {
        ansagenThisRound.push(state);
      }
    });
    currentGameRound.ansagen = ansagenThisRound;
    gameRounds.splice([gameRoundCount], 1, currentGameRound);
    dispatch(setCurrentGameRound(gameRounds));
    console.log(gameRounds);
    dispatch(setModalPage(3));
  };

  const dispatch = useDispatch();

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
            <STitle>3 Seite</STitle>
          </SHeader>

          <Box flexDirection={"column"} textAlign={"center"}>
            {/* Bagat */}
            <AnsageElement
              props={{
                elementValue: bagatValue,
                setElementValue: setBagatValue,
                currentGameRound: currentGameRound,
              }}
            />
            {/* Uhu */}
            <AnsageElement
              props={{
                elementValue: uhuValue,
                setElementValue: setUhuValue,
                currentGameRound: currentGameRound,
              }}
            />
            {/* Kakadu */}
            <AnsageElement
              props={{
                elementValue: kakaduValue,
                setElementValue: setKakaduValue,
                currentGameRound: currentGameRound,
              }}
            />
            {/* Drull */}

            <AnsageElement
              props={{
                elementValue: drullValue,
                setElementValue: setDrullValue,
                currentGameRound: currentGameRound,
              }}
            />

            {/* Könige */}
            <AnsageElement
              props={{
                elementValue: koenigeValue,
                setElementValue: setKoenigeValue,
                currentGameRound: currentGameRound,
              }}
            />
            {/* Ulti */}
            <AnsageElement
              props={{
                elementValue: ultiValue,
                setElementValue: setUltiValue,
                currentGameRound: currentGameRound,
              }}
            />
            {/* Mond */}
            <AnsageElement
              props={{
                elementValue: mondValue,
                setElementValue: setMondValue,
                currentGameRound: currentGameRound,
              }}
            />
          </Box>
        </SModal>
      </SModalWrapper>
    </>
  );
};

export default Ansagen;

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

import { Fragment, useState } from "react";

const AnsageElement = ({props}) => {

const {elementValue, setElementValue, currentGameRound} = props

  const [elementAnsage, setElementAnsage] = useState(false);
  const [elementSpritzer, setElementSpritzer] = useState(0);
  const [elementOpen, setElementOpen] = useState(false);
  

  const filterForLength = (array) => {

    const names = array.map((a) => a.name);
    return names.join(" | ").toString();
  };

  const handleAnsagePlayerChange = (event) => {
    if (event.target.value === JSON.stringify(elementValue.player)) {
      setElementValue({...elementValue, player:null});
      
    } else {
      setElementValue({...elementValue, player:JSON.parse(event.target.value)})
      
    }

  }

  const handleAnsageCheckboxChange = () => {
    elementAnsage ? (
      setElementValue({...elementValue, value:elementValue.value / 2})
    ) : (setElementValue({...elementValue, value:elementValue.value * 2}))
    setElementAnsage(!elementAnsage)
  }

  const handleSpritzer = (nr) => {
    setElementSpritzer(elementSpritzer + nr)
    if (nr === 1) {
      setElementValue({...elementValue, value:elementValue.value * 2})
    } else {
      setElementValue({...elementValue, value:elementValue.value / 2})
    }
   
  }

  const resetAnsage = () => {
    setElementAnsage(false);
    setElementSpritzer(0);
    setElementValue({...elementValue, player: null})
  }

  return (
    <Fragment>
      <Button
        sx={{
          width: "100%",
          minWidth: { sm: "100px", md: "250px" },
          minHeight: "50px",
        }}
        onClick={() => {
          setElementOpen(!elementOpen);
        }}
      >
        {elementValue.title} | Wert: {elementValue.value}
      </Button>

      {elementOpen && (
        <Stack
          flexDirection={"column"}
          borderTop={"1px solid #2196f3"}
          borderBottom={"1px solid #2196f3"}
          paddingY={3}
          textAlign={"center"}
        >
          <Box flexDirection={"row"}>
            <FormControl>
              <FormLabel id="bagat-player-radio-group">von</FormLabel>
              <RadioGroup
                aria-labelledby="bagat-player-radio-group"
                name="bagat-player-radio-group"
                row
                value={JSON.stringify(elementValue.player)}
                onChange={handleAnsagePlayerChange}
              >
                <FormControlLabel
                  value={JSON.stringify(currentGameRound.activePlayers)}
                  control={<Radio />}
                  label={filterForLength(currentGameRound.activePlayers)}
                />
                <FormControlLabel
                  value={JSON.stringify(currentGameRound.passivePlayers)}
                  control={<Radio />}
                  label={filterForLength(currentGameRound.passivePlayers)}
                />
              </RadioGroup>
              <FormLabel id="angesagt-checkbox">Angesagt?</FormLabel>
              <FormControlLabel
                sx={{ display: "flex", margin: "auto" }}
                id="angesagt-checkbox"
                checked={elementAnsage}
                control={
                  <Checkbox
                    onChange={handleAnsageCheckboxChange}
                  />
                }
                label="Angesagt"
              />
            </FormControl>
          </Box>

          <Box flexDirection={"row"}>
            <Typography variant="body" textAlign={"right"}>
              Spritzer: {elementSpritzer}
            </Typography>
            <Button
              sx={{
                marginLeft: "10px",
                border: "1px solid #2196f3",
                borderRadius: 10,
                padding: "3px",
                minWidth: 70,
              }}
              onClick={() => {
                handleSpritzer(1);
              }}
            >
              +
            </Button>
            <Button
              sx={{
                marginLeft: "5px",
                border: "1px solid #2196f3",
                borderRadius: 10,
                padding: "3px",
                minWidth: 70,
              }}
              onClick={() => {
                handleSpritzer(-1);
              }}
            >
              -
            </Button>
          </Box>
          <Button
            color="error"
            sx={{
              marginTop: "20px",
              borderRadius: 10,
              padding: "3px",
              minWidth: 70,
            }}
            onClick={resetAnsage}
          >
            Zurücksetzen
          </Button>
        </Stack>
      )}
    </Fragment>
  );
};

export default AnsageElement;

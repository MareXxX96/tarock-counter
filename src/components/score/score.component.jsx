import {
  Box,
  Button,
  Input,
  Paper,
  Grid,
  TextField,
  Typography,
  Stack
} from "@mui/material";
import { Add, Clear, Remove } from "@mui/icons-material";
import React, { useState, useContext } from "react";
import "./score.css";
import TestGrid from "../test-grid/test-grid.component";

function Score() {



  return (
    <Box m={2} pt={3} >
      <TestGrid />
     </Box>
    
  );
}

export default Score;

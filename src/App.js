// import './App.css';
import { Button } from '@mui/material';
import { Box } from '@mui/system';

import Navbar from './components/navbar/navbar.component';
import Score from './components/score/score.component';
import TestGrid from './components/test-grid/test-grid.component';

const App = () => {
  return (
    <Box>
      <Navbar />
      <TestGrid />
    </Box>
  );
}

export default App;

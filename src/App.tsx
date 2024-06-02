import React, { Box, Typography, Grid, Button } from '@mui/material';
import TimerCard from './components/TimerCard.tsx';

import './App.css';

import useTimerContext  from './context/useTimerContext';

const App = () => {
  const {
    timers,

    handleAddTimer,
    handleResetTimer,

    handleUpdateTimer,
    handleUpdateTimerTick,
  } = useTimerContext();

  return (
    <Box
      sx={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography component="h1" variant="h4" gutterBottom>
        Simple Timers
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        You can add timers of your own
      </Typography>

      <Grid container>
        <Grid item xs>
          <Button onClick={() => handleAddTimer()}>Add New Timer</Button>
        </Grid>

        <Grid item>
          <Button>Remove Timer(s)</Button>
        </Grid>
      </Grid>


      <Grid container spacing={2} sx={{ overflow: 'auto' }}>
        {timers.map((timer) => (
          <Grid item xs key={timer.id}>
            <TimerCard timer={timer} handleUpdateTimer={handleUpdateTimer} handleUpdateTimerTick={handleUpdateTimerTick} handleResetTimer={handleResetTimer} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;

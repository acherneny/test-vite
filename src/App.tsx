import React, { Box, Typography, Grid, Button } from '@mui/material';
import TimerCard from './components/TimerCard.tsx';

import './App.css';

import useTimerContext from './context/useTimerContext';

import TimerType from './types/timer.type.ts';

const App = () => {
  const {
    timers,

    handleAddTimer,
    handleRemoveTimers,
    handleResetTimer,

    handleUpdateTimer,
    handleUpdateTimerTick,

    selectedTimerIds,
    toggleSelectedTimer,
  } = useTimerContext();

  const isTimerSelected = (timer: TimerType) =>
    selectedTimerIds.indexOf(timer.id) > -1;

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
      }}
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
          <Button
            disabled={selectedTimerIds.length === 0}
            onClick={handleRemoveTimers}
          >
            Remove Timer(s)
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ overflow: 'auto' }}>
        {timers.map((timer) => (
          <Grid item xs={12} key={timer.id}>
            <TimerCard
              timer={timer}
              handleUpdateTimer={handleUpdateTimer}
              handleUpdateTimerTick={handleUpdateTimerTick}
              handleResetTimer={handleResetTimer}
              isSelected={isTimerSelected(timer)}
              toggleSelectedTimer={toggleSelectedTimer}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default App;

import { Box, Typography, Grid, Button } from '@mui/material';
import TimerCard from './TimerCard';

import './App.css';

import { useTimerContext } from './TimerContext.tsx';

function App() {
  const {
    timers,

    handleAddTimer,
    // handleRemoveTimer,

    // handleStartTimer,
    // handlePauseTimer,
  } = useTimerContext();

  console.log('timers: ', timers);
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography component="h1" variant="h4" gutterBottom>
        Simple Timers
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        You can add timers of your own
      </Typography>

      <Grid container>
        <Grid item xs>
          <Button>Add New Timer</Button>
        </Grid>

        <Grid item>
          <Button>Remove Timer(s)</Button>
        </Grid>
      </Grid>

      <button onClick={() => handleAddTimer()}>AddTimer</button>

      <Grid container spacing={2} sx={{ overflow: 'auto' }}>
        {timers.map(() => (
          <Grid item xs>
            <TimerCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;

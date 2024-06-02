import React, { FC, useEffect, useState, useRef } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from '@mui/material';

import msToHMS from '../utils/msToHMS';

import { TimerCardProps } from './TimerCard.type';

// I would place it to env, but not sure you will have the same env as i do
// Step in Milliseconds
const timerStep = 10;

const TimerCard: FC<TimerCardProps> = (props) => {
  const {
    timer,
    handleResetTimer,
    handleUpdateTimer,
    handleUpdateTimerTick,

    isSelected,
    toggleSelectedTimer,
  } = props;

  const [isPaused, setIsPaused] = useState(true);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = () => {
    setIsPaused(false);
    handleUpdateTimer({ ...timer, lastTime: Date.now() });

    intervalRef.current = setInterval(() => {
      handleUpdateTimerTick(timer.id);
    }, timerStep);
  };

  const handlePause = () => {
    setIsPaused(true);
    handleUpdateTimerTick(timer.id);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleReset = () => {
    setIsPaused(true);
    handleResetTimer(timer.id);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  useEffect(
    () => () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
    []
  );

  const handleToggleSelectedTimer = () => {
    toggleSelectedTimer(timer.id);
  };

  const isTimerStarted = timer.timePassed !== 0;

  const startTimerLabel = !isTimerStarted ? 'Start' : 'Continue';

  return (
    <Card>
      <CardHeader
        title={`ID: ${timer.id}`}
        action={
          <Checkbox checked={isSelected} onChange={handleToggleSelectedTimer} />
        }
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Time: {msToHMS(timer.timePassed)}
        </Typography>
      </CardContent>

      <CardActions>
        {isPaused ? (
          <Button size="small" onClick={handleStart}>
            {startTimerLabel}
          </Button>
        ) : (
          <Button size="small" onClick={handlePause}>
            Pause
          </Button>
        )}

        <Button disabled={!isTimerStarted} onClick={handleReset}>
          Reset
        </Button>
      </CardActions>
    </Card>
  );
};
export default TimerCard;

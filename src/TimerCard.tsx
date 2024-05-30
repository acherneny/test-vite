import { FC, useEffect, useState, useRef,  } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from '@mui/material';

import { useTimerContext } from './TimerContext.tsx';

type TimerCardProps = {
  timer: any
}

const TimerCard: FC<TimerCardProps> = (props) => {
  const { timer } = props

  
  const {
    handleUpdateTimer,
  } = useTimerContext();
  
  const [timerState, setTimerState] = useState({
    // How much time the timer has been working
    timePassed: 0,
    // The last time timePassed has been updated in ms
    lastTime: Date.now(),
  })

  const [isPaused, setIsPaused] = useState(false)

  const intervalRef = useRef<any>(null);


  const handleStart = () => {
    intervalRef.current = setInterval(() => handleUpdateTimer(timer.id), 1000);

    setTimerState(ps => ({ ...ps, prevTimer: Date.now()}))
    setIsPaused(false)
  }

  const handlePause = () => {
    clearInterval(intervalRef.current)
    handleUpdateTimer(timer.id)
    setIsPaused(true)
  }

  useEffect(() => () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)}
      }
  , [])

  return (
    <Card sx={{ maxWidth: 450 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Timer: {Math.round(timerState.timePassed / 1000)}
        </Typography>
      </CardContent>


      <CardActions>
        <Button size="small" onClick={handleStart}>Start</Button>
        <Button size="small" onClick={handlePause}>Pause</Button>
      </CardActions>
    </Card>
  );
};
export default TimerCard;

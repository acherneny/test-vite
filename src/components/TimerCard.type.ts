import TimerType from '../types/timer.type.ts';

export type TimerCardProps = {
  timer: TimerType;

  handleResetTimer: (timerId: string) => void;
  handleUpdateTimer: (timer: TimerType) => void;
  handleUpdateTimerTick: (timerId: string) => void;
};

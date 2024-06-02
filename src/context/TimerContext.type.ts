import TimerType from '../types/timer.type.ts';

export type TimerContextInitialState = {
  timers: TimerType[];
};

export type TimerContextType = {
  timers: TimerType[];

  handleAddTimer: () => void;
  handleRemoveTimer: (timerId: string) => void;
  handleResetTimer: (timerId: string) => void;

  handleUpdateTimer: (timer: TimerType) => void;
  handleUpdateTimerTick: (timerId: string) => void;

  selectedTimerIds: string[];
  toggleSelectedTimer: (timerId: string) => void;
};

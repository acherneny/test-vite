import React, { createContext, useState, useMemo, useCallback } from 'react';

import {
  TimerContextInitialState,
  TimerContextType,
} from './TimerContext.type';

import TimerType from '../types/timer.type.ts';
import getId from '../utils/getId.ts';

const initialState: TimerContextInitialState = {
  timers: [],
};

export const TimeContext = createContext<TimerContextType>({
  timers: [],

  handleAddTimer: () => {},
  handleRemoveTimers: () => {},
  handleResetTimer: () => {},

  handleUpdateTimer: () => {},
  handleUpdateTimerTick: () => {},

  selectedTimerIds: [],
  toggleSelectedTimer: () => {},
});

const TimeContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [timersState, setTimersState] =
    useState<TimerContextInitialState>(initialState);

  const [selectedTimerIds, setSelectedTimerIds] = useState<string[]>([]);

  // Create and add new timer to the list of timers
  const handleAddTimer = useCallback(
    () =>
      setTimersState((timersState) => ({
        timers: [
          { id: getId(), timePassed: 0, lastTime: 0 },
          ...timersState.timers,
        ],
      })),
    []
  );

  // Remove timer from the list of timers by timerId
  const handleRemoveTimers = useCallback(
    () =>
      setTimersState((timersState) => ({
        timers: timersState.timers.filter(
          (timer) => selectedTimerIds.indexOf(timer.id) === -1
        ),
      })),
    [selectedTimerIds]
  );

  // Reset timer from the list of timers by timerId
  const handleResetTimer = useCallback(
    (timerId: string) =>
      setTimersState((timersState) => ({
        timers: timersState.timers.map((timer) => {
          if (timer.id === timerId) {
            return {
              id: timerId,
              timePassed: 0,
              lastTime: 0,
            };
          }

          return timer;
        }),
      })),
    []
  );

  const handleUpdateTimer = useCallback(
    (newTimer: TimerType) =>
      setTimersState((timersState) => ({
        timers: timersState.timers.map((timer) =>
          timer.id === newTimer.id ? newTimer : timer
        ),
      })),
    []
  );

  const handleUpdateTimerTick = useCallback(
    (timerId: string) =>
      setTimersState((timersState) => ({
        timers: timersState.timers.map((timer) => {
          if (timer.id === timerId) {
            const now = Date.now();
            return {
              ...timer,

              timePassed: timer.timePassed + (Date.now() - timer.lastTime),
              lastTime: now,
            };
          }

          return timer;
        }),
      })),
    []
  );

  const toggleSelectedTimer = useCallback((timerId: string) => {
    setSelectedTimerIds((selectedTimerIds) =>
      // If timer selected:
      selectedTimerIds.indexOf(timerId) > -1
        ? // - remove from the selected list
          selectedTimerIds.filter(
            (selectedTimerId) => selectedTimerId !== timerId
          )
        : // - otherwise - add to the selected list
          [timerId, ...selectedTimerIds]
    );
  }, []);

  const value = useMemo(
    () => ({
      timers: timersState.timers,

      handleAddTimer,
      handleRemoveTimers,
      handleResetTimer,

      handleUpdateTimer,
      handleUpdateTimerTick,

      selectedTimerIds,
      toggleSelectedTimer,
    }),
    [
      timersState,

      handleAddTimer,
      handleRemoveTimers,
      handleResetTimer,

      handleUpdateTimer,
      handleUpdateTimerTick,

      selectedTimerIds,
      toggleSelectedTimer,
    ]
  );

  return (
    <TimeContext.Provider value={value}>{props.children}</TimeContext.Provider>
  );
};

export default TimeContextProvider;

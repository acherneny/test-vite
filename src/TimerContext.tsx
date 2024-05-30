import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

type TimerHistoryItem = { startTime: string; stopStop?: string };

type TimerType = {
  id: string;
  history: TimerHistoryItem[];
};

type TimerContextInitialState = {
  timers: TimerType[];
};

type TimerContextType = {
  timers: TimerType[];

  handleAddTimer: () => void;
  handleRemoveTimer: () => void;

  handleStartTimer: () => void;
  handlePauseTimer: () => void;
};

const initialState: TimerContextInitialState = {
  timers: [] as TimerType[],
};

export const TimeContext = createContext<TimerContextType>(
  // TODO: Define correct initial state
  null as unknown as TimerContextType
);

export const useTimerContext = () => useContext<TimerContextType>(TimeContext);

// TODO: Change id getter
let id = 0;
const getId = () => String(++id);

const TimeContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [timersState, setTimersState] =
    useState<TimerContextInitialState>(initialState);

  // Create and add new timer to the list of timers
  const handleAddTimer = useCallback(
    () =>
      setTimersState((timersState) => ({
        timers: [{ id: getId(), history: [] }, ...timersState.timers],
      })),
    []
  );

  // Remove timer from the list of timers by timerId
  const handleRemoveTimer = useCallback(
    (timerId: string) =>
      setTimersState((timersState) => ({
        timers: timersState.timers.filter((timer) => timer.id !== timerId),
      })),
    []
  );

  // Start timer by timerId
  const handleStartTimer = useCallback(
    (timerId: string) =>
      setTimersState((timersState) => ({
        timers: timersState.timers.map((timer) => {
          if (timer.id === timerId) {
            return {
              ...timer,

              history: [
                // Add new history Item with currect startTime and empty stopStop
                { startTime: String(new Date()), stopStop: '' },
                ...timer.history,
              ],
            };
          }

          return timer;
        }),
      })),
    []
  );

  // Pause timer by timerId
  const handlePauseTimer = useCallback(
    (timerId: string) =>
      setTimersState((timersState) => ({
        timers: timersState.timers.map((timer) => {
          if (timer.id === timerId) {
            return {
              ...timer,

              history: [
                {
                  startTime: timer.history[0].startTime,
                  stopStop: String(new Date()),
                },

                ...timer.history,
              ],
            };
          }

          return timer;
        }),
      })),
    []
  );

  const value = useMemo(
    () => ({
      timers: timersState.timers,

      handleAddTimer,
      handleRemoveTimer,

      handleStartTimer,
      handlePauseTimer,
    }),
    [
      timersState,
      handleAddTimer,
      handleRemoveTimer,

      handleStartTimer,
      handlePauseTimer,
    ]
  );

  return (
    <TimeContext.Provider value={value}>{props.children}</TimeContext.Provider>
  );
};

export default TimeContextProvider;

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';


type TimerType = {
  id: string;

  timePassed: number,
  lastTime: number,
};

type TimerContextInitialState = {
  timers: TimerType[];
};

type TimerContextType = {
  timers: TimerType[];

  handleAddTimer: () => void;
  handleRemoveTimer: (timerId: string) => void;

  handleUpdateTimer: (timerId: string) => void;
};

const initialState: TimerContextInitialState = {
  timers: [],
};

export const TimeContext = createContext<TimerContextType>(
  {
    timers: [],

    handleAddTimer: () => { },
    handleRemoveTimer: () => { },

    handleUpdateTimer: () => { },
  }
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
        timers: [{ id: getId(), timePassed: 0, lastTime: 0 }, ...timersState.timers],
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

  const handleUpdateTimer = useCallback(
    (timerId: string) =>
      setTimersState((timersState) => ({
        timers: timersState.timers.map((timer) => {
          if (timer.id === timerId) {
            return {
              ...timer,
              prevTimer: Date.now()
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

      handleUpdateTimer,
    }),
    [
      timersState,
      handleAddTimer,
      handleRemoveTimer,

      handleUpdateTimer,
    ]
  );

  return (
    <TimeContext.Provider value={value}>{props.children}</TimeContext.Provider>
  );
};

export default TimeContextProvider;

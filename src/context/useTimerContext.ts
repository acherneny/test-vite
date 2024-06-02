import { useContext } from 'react';

import { TimeContext } from './TimerContext';

import { TimerContextType } from './TimerContext.type';

const useTimerContext = () => useContext<TimerContextType>(TimeContext);

export default useTimerContext;

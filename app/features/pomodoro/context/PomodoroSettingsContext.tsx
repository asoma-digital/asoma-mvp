import { FocusChip, LongBreakChip, ShortBreakChip } from '../components/ModeChips'
import type { Color } from "../utils"
import type { PomodoroMode } from '../components/types/mode'
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';


export const modeConfig = {
    focus: {
        Chip: FocusChip,
        color: 'red' as Color,
    },
    shortBreak: {
        Chip: ShortBreakChip,
        color: 'blue' as Color,
    },
    longBreak: {
        Chip: LongBreakChip,
        color: 'green' as Color,
    },
} satisfies Record<PomodoroMode, { Chip: React.ComponentType; color: Color }>

type PomodoroSettings = {
  focusLength: number
  shortBreakLength: number
  longBreakLength: number
  pomodorosUntilLongBreak: number
  numberOfSets: number
  setFocusLength: (val: number) => void
  setShortBreakLength: (val: number) => void
  setLongBreakLength: (val: number) => void
  setPomodorosUntilLongBreak: (val: number) => void
  setNumberOfSets: (val: number) => void
};

const PomodoroSettingsContext = createContext<PomodoroSettings | undefined>(undefined);


export const PomodoroSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [focusLength, setFocusLength] = useState(25);
  const [shortBreakLength, setShortBreakLength] = useState(5);
  const [longBreakLength, setLongBreakLength] = useState(15);
  const [pomodorosUntilLongBreak, setPomodorosUntilLongBreak] = useState(4);
  const [numberOfSets, setNumberOfSets] = useState(1);


  return (
    <PomodoroSettingsContext.Provider value={{
      focusLength,
      shortBreakLength,
      longBreakLength,
      pomodorosUntilLongBreak,
      numberOfSets,
      setFocusLength,
      setShortBreakLength,
      setLongBreakLength,
      setPomodorosUntilLongBreak,
      setNumberOfSets,
    }}>
      {children}
    </PomodoroSettingsContext.Provider>
  );
};

export const usePomodoroSettings = () => {
  const context = useContext(PomodoroSettingsContext);
  if (!context) {
    throw new Error('usePomodoroSettings must be used within a PomodoroSettingsProvider');
  }
  return context;
};
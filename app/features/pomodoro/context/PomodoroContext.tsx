import { createContext, useContext, useState } from 'react';
import { usePomodoroSettings } from './PomodoroSettingsContext';
import type { PomodoroMode } from '../components/types/mode';
import type { ReactNode } from 'react';

type PomodoroContextType = {
    handleComplete: () => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export const PomodoroProvider = ({ children }: { children: ReactNode }) => {
    const {
        pomodorosUntilLongBreak,
        numberOfSets,
    } = usePomodoroSettings()

    const [pomodorosLeft, setPomodorosLeft] = useState(pomodorosUntilLongBreak - 1);
    const [setsLeft, setSetsLeft] = useState(numberOfSets - 1);
    const [mode, setMode] = useState<PomodoroMode>('focus');
    const [isRunning, setIsRunning] = useState(false);

    const handleComplete = () => {
        if (isRunning) setIsRunning(false)
        if (mode === 'focus') {
            if (pomodorosLeft > 0) {
                setPomodorosLeft(p => p - 1)
                setMode('shortBreak')
                setTimeout(() => setIsRunning(true), 1000)
            } else if (setsLeft > 0) {
                setSetsLeft(s => s - 1)
                setPomodorosLeft(pomodorosUntilLongBreak - 1)
                setMode('longBreak')
                setTimeout(() => setIsRunning(true), 1000)
            } else {
                setIsRunning(false)
                alert("🎉 All pomodoro sets complete!")
                setMode('focus')
                setPomodorosLeft(pomodorosUntilLongBreak - 1)
                setSetsLeft(numberOfSets - 1)
            }
        } else {
            setMode('focus')
            setTimeout(() => setIsRunning(true), 1000)
        }
    }

    return (
        <PomodoroContext.Provider value={{ handleComplete }}>
            {children}
        </PomodoroContext.Provider>
    );

};

export const usePomodoro = () => {
    const context = useContext(PomodoroContext);
    if (!context) {
        throw new Error('usePomodoro must be used within a PomodoroProvider');
    }
    return context;
};

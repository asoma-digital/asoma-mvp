// pomodoro/components/TimerDisplay.tsx

import { useEffect, useState, useRef } from 'react'
import './styles/TimerDisplay.css'
import type { PomodoroMode } from './types/mode'
import { usePomodoroSettings } from '../context/PomodoroSettingsContext'

type TimerDisplayProps = {
    isRunning: boolean
    mode: PomodoroMode
    setIsRunning: (val: boolean) => void
    setMode: (val: PomodoroMode) => void
}

export default function TimerDisplay({ isRunning, mode, setIsRunning, setMode }: TimerDisplayProps) {
    const {
        focusLength,
        shortBreakLength,
        longBreakLength,
        pomodorosUntilLongBreak,
        numberOfSets,
    } = usePomodoroSettings()

    const audioRef = useRef<HTMLAudioElement | null>(null)

    function getInitialTime(currentMode: PomodoroMode) {
        switch (currentMode) {
            case 'focus': return focusLength * 60
            case 'shortBreak': return shortBreakLength * 60
            case 'longBreak': return longBreakLength * 60
        }
    }

    const [timeLeft, setTimeLeft] = useState(() => getInitialTime(mode))
    const [pomodorosLeft, setPomodorosLeft] = useState(pomodorosUntilLongBreak - 1)
    const [setsLeft, setSetsLeft] = useState(numberOfSets - 1)

    // ✅ Restore from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('pomodoroStart')
        if (!saved) return

        const { startTime, duration } = JSON.parse(saved)
        const now = Date.now()
        const elapsed = Math.floor((now - startTime) / 1000)
        const remaining = duration - elapsed

        if (remaining > 0) {
            setTimeLeft(remaining)
            setIsRunning(true)
        } else {
            localStorage.removeItem('pomodoroStart')
        }
    }, [])

    // ✅ Countdown logic
    useEffect(() => {
        if (!isRunning) return

        const start = Date.now()
        const initial = timeLeft

        localStorage.setItem('pomodoroStart', JSON.stringify({
            startTime: start,
            duration: initial,
        }))

        const interval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - start) / 1000)
            const remaining = initial - elapsed

            if (remaining <= 0) {
                clearInterval(interval)
                localStorage.removeItem('pomodoroStart')
                setTimeLeft(0)
                handleComplete()
            } else {
                setTimeLeft(remaining)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [isRunning, timeLeft])

    // ✅ Reset time when mode or durations change
    useEffect(() => {
        if (!isRunning) {
            setTimeLeft(getInitialTime(mode))
        }
    }, [mode, focusLength, shortBreakLength, longBreakLength])

    const handleComplete = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/sounds/complete.mp3')
        }

        audioRef.current.play().catch(err => console.error('Audio playback failed:', err))
        setIsRunning(false)

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

    // ✅ Tab title updates
    useEffect(() => {
        const min = String(Math.floor(timeLeft / 60)).padStart(2, '0')
        const sec = String(timeLeft % 60).padStart(2, '0')

        document.title = isRunning ? `${min}:${sec} • Pomodoro` : 'asoma'
        return () => { document.title = 'asoma' }
    }, [timeLeft, isRunning])

    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60

    return (
        <div className={`timer ${isRunning ? 'timer-running' : 'timer-paused'}`}>
            <span>{String(minutes).padStart(2, '0')}</span>
            <span>{String(seconds).padStart(2, '0')}</span>
        </div>
    )
}

import '../../app-components/features/pomodoro/styles/pomodoroStyles.css'
import type { PomodoroMode } from '../../app-components/features/pomodoro/components/types/mode'
import { useRef, useState } from 'react'
import TimerDisplay from '../../app-components/features/pomodoro/components/TimerDisplay'
import ControlButtons from '../../app-components/features/pomodoro/components/ControlButtons'
import { modeConfig } from '../../app-components/features/pomodoro/context/PomodoroSettingsContext'
import OptionsModal from '../../app-components/features/pomodoro/components/OptionsModal'
import SettingsModal from '../../app-components/features/pomodoro/components/SettingsModal'

export default function PomodoroPage() {
    const [mode, setMode] = useState<PomodoroMode>('focus')
    const [isRunning, setIsRunning] = useState(false)
    const [isOptionsOpen, setIsOptionsOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const unlockSound = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio('/sounds/unlock.mp3');
        }
        audioRef.current.play()
        .then(() => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }).catch(err => console.error('Audio playback failed:', err));
    };

    const toggleRunning = () => {
        unlockSound();
        setIsRunning(prev => !prev)
    }

    const { Chip, color } = modeConfig[mode]

    function handleOnClose() {
         setIsSettingsOpen(false)
    }

    return (
        <div className={`pomodoro-wrapper bg-${mode}`}>
            <div className="pomodoro-content">
                <button className='back-button' onClick={() => window.location.href = '/dashboard'}> ← Back to Dashboard </button>

                <Chip />

                <TimerDisplay 
                    isRunning={isRunning} 
                    setIsRunning={setIsRunning} 
                    mode={mode} 
                    setMode={setMode} 
                />

                <ControlButtons 
                    color={color} 
                    isRunning={isRunning} 
                    toggleRunning={toggleRunning}
                    onOptionsClick={() => setIsOptionsOpen(true)}
                    onSkipClick={() => setIsSettingsOpen(true)}
                />

                {isOptionsOpen && (
                    <OptionsModal 
                        mode={mode} 
                        onClose={() => setIsOptionsOpen(false)} 
                        onPreferencesClick={() => {
                            setIsOptionsOpen(false)
                            setIsSettingsOpen(true)
                        }}
                    />
                )}

                {isSettingsOpen && (
                    <SettingsModal mode={mode} onClose={handleOnClose} isRunning={isRunning}/>
                )}

            </div>
        </div>
    )
}
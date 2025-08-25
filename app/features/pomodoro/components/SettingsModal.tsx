// needs number input, switch input, header, mode

import SettingItemNumber from "./SettingItemNumber";
// import SettingItemSwitch from "./SettingItemSwitch";
import type { PomodoroMode } from './types/mode'
import { modeColorMap } from '../utils'
import XIcon from "./icons/XIcon";
import { usePomodoroSettings } from '../context/PomodoroSettingsContext';


type SettingsModalProps = {
    mode: PomodoroMode
    onClose: () => void
    isRunning: boolean
}

export default function SettingsModal({ mode, onClose, isRunning}: SettingsModalProps){
    const color = `var(--${modeColorMap[mode]}-alpha-900)`
    const bgColor = `var(--${modeColorMap[mode]}-alpha-50)`
//   Destructure values and setters from context
  const {
    focusLength,
    shortBreakLength,
    longBreakLength,
    pomodorosUntilLongBreak,
    numberOfSets,
    setFocusLength,
    setShortBreakLength,
    setLongBreakLength,
    setPomodorosUntilLongBreak,
    setNumberOfSets
  } = usePomodoroSettings();

    return(
        <div className="modal-overlay">
            <div className="settings-modal" style={{backgroundColor: bgColor}}>
                {/* // header */}
                <div className="settings-modal-header" style={{ color }}>
                    <h1>
                        Settings
                    </h1>
                    <button
                        className="settings-modal-header-icon"onClick={() => {
                            if (isRunning) {
                                const confirmClose = window.confirm(
                                    "Your timer is currently running. Changing settings will restart the timer. Do you still want to close settings?"
                                )
                                if (!confirmClose) return
                            }
                            onClose()
                        }}
                    >
                        <XIcon size={18}/>
                    </button>
                </div>
                {/* // Switch - Dark mode */}
                {/* <SettingItemSwitch settingItemName="Dark mode" mode={mode}/> */}
                {/* // Number - Focus length */}
                <SettingItemNumber
                    settingItemName="Focus length"
                    value={focusLength}
                    mode={mode}
                    onChange={(val) => {
                        setFocusLength(val)
                        console.log("focusLength is now:", val)
                    }}
                />
                {/* // Number - Pomodoros until long break */}
                <SettingItemNumber
                    settingItemName="Pomodoros until long break"
                    value={pomodorosUntilLongBreak}
                    mode={mode}
                    onChange={setPomodorosUntilLongBreak}
                />
                {/* // Number - Short break length */}
                <SettingItemNumber
                    settingItemName="Short break length"
                    value={shortBreakLength}
                    mode={mode}
                    onChange={setShortBreakLength}
                />
                {/* // Number - Long break length */}
                <SettingItemNumber
                    settingItemName="Long break length"
                    value={longBreakLength}
                    mode={mode}
                    onChange={setLongBreakLength}
                />
                {/* // Number - Number of sets */}
                <SettingItemNumber
                    settingItemName="Number of sets"
                    value={numberOfSets}
                    mode={mode}
                    onChange={setNumberOfSets}
                />
                {/* // Switch - Auto resume timer */}
                {/* <SettingItemSwitch settingItemName="Auto resume timer" mode={mode}/> */}
                {/* // Switch Sound */}
                {/* <SettingItemSwitch settingItemName="Sound" mode={mode}/> */}
                {/* // Switch Notifications */}
                {/* <SettingItemSwitch settingItemName="Notifications" mode={mode}/> */}
            </div>
        </div>
    )
}
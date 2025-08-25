import './styles/Switch.css'
import type { PomodoroMode } from './types/mode'
import { modeColorMap } from '../utils'


type SwitchProps = {
    isOn: boolean
    onToggle: () => void
    mode: PomodoroMode
}

export default function Switch({ isOn, onToggle, mode }: SwitchProps) {
    const toggleOffColor = `var(--${modeColorMap[mode]}-alpha-300)`
    const toggleOnColor = `var(--${modeColorMap[mode]}-alpha-600)`

    return (
        <div
            className={`switch-wrapper ${isOn ? 'on' : 'off'}`}
            onClick={onToggle}
        >
            <div
                className="switch-handle"
                style={{
                    backgroundColor: isOn ? toggleOnColor : toggleOffColor,
                    transform: isOn ? 'translateX(18px)' : 'translateX(0)',
                }}
            />
        </div>
    )
}
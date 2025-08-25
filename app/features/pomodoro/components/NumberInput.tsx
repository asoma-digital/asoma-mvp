import "./styles/numberInput.css"
import { modeColorMap } from '../utils'
import type { PomodoroMode } from "./types/mode"



type NumberInputProps = {
    defaultValue: number
    mode: PomodoroMode
    onChange: (value: number) => void
}

export default function NumberInput({ 
    defaultValue,
    mode,
    onChange
}: NumberInputProps) {
    const color = `var(--${modeColorMap[mode]}-alpha-900)`

    const updateValue = (newVal: number) => {
        onChange(newVal)
    }

    return (
    <div className="number-input-container" style={{ color }}>
        <div className="number-input-box">
            <span className="number-value">{defaultValue}</span>
        </div>
        <div className="number-controls">
            <span onClick={() => updateValue(defaultValue + 1)} className="number-btn-up">▲</span>
            <span onClick={() => updateValue(defaultValue - 1)} className="number-btn-down">▼</span>
        </div>
    </div>
    )
}
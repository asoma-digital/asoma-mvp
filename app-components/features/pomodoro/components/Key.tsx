import type { PomodoroMode } from './types/mode'
import { modeColorMap } from '../utils'

type KeyProps = {
    keyName: string
    mode: PomodoroMode
}

export default function Key({ keyName, mode }: KeyProps) {

    const color = `var(--${modeColorMap[mode]}-alpha-900)`

    return (
        <span
            className="key"
            style={{ color }}
        >
            {keyName}
        </span>
    )
}
import type { PomodoroMode } from "./mode"

export type SettingItemNumberProps = {
    settingItemName: string
    mode: PomodoroMode
    value: number
    onChange: (value: number) => void
}
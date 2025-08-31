import type { SettingItemSwitchProps } from "./types/settingItemSwitch"
import Switch from "./Switch"
import { useState } from "react"
import { modeColorMap } from '../utils'

export default function SettingItemSwitch({settingItemName, mode}: SettingItemSwitchProps ){
    const color = `var(--${modeColorMap[mode]}-alpha-950)`
    const [isOn, setIsOn] = useState(false)

    const handleToggle = () => {
        setIsOn(prev => !prev)
        console.log(`${settingItemName} toggled to ${!isOn}`)
    }

    return(
        <div className="setting-item-switch">
            <span style={{ color }}>{settingItemName}</span>
            <Switch isOn={isOn} onToggle={handleToggle} mode={mode}/>
        </div>
    )
}
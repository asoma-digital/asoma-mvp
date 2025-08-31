import type { SettingItemNumberProps } from "./types/settingItemNumber"
import { modeColorMap } from '../utils'
import NumberInput from "./NumberInput"

export default function SettingItemNumber({settingItemName, mode, value, onChange}: SettingItemNumberProps ){
    const color = `var(--${modeColorMap[mode]}-alpha-950)`

    return(
        <div className="setting-item-number" style={{ color }}>
            <span >{settingItemName}</span>
            <NumberInput
                defaultValue={value}
                mode={mode}
                onChange={onChange}
            />

        </div>
    )
}
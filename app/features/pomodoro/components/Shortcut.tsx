import Key from './Key'
import type { ShortcutProps } from './types/shortcut'
import { modeColorMap } from '../utils'

export default function Shortcut({ keyName, mode } : ShortcutProps){
    const color = `var(--${modeColorMap[mode]}-alpha-900)`

    return (
        <div className='shortcut'>
            <span>
                <Key keyName='Ctrl' mode={mode}/>
            </span>
            <span style={{ color }}>+</span>
            <span>
                <Key keyName={keyName} mode={mode}/>
            </span>
        </div>

    )
}
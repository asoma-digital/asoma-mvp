import './styles/optionsModal.css'
import Menu from './Menu'
import type { PomodoroMode } from './types/mode'
import { modeColorMap } from '../utils'


type OptionsModalProps = {
  mode: PomodoroMode
  onClose: () => void
  onPreferencesClick: () => void
}

export default function OptionsModal({ mode, onClose, onPreferencesClick }: OptionsModalProps) {

    const color = `var(--${modeColorMap[mode]}-alpha-50)`

  return (
    <div className="modal-overlay" style={{ backgroundColor: color}} onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
            <h1>Options</h1>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <Menu mode={mode} onPreferencesClick={onPreferencesClick}/>
      </div>
    </div>
  )
}
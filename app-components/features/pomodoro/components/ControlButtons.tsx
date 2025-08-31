import IconButton from "./IconButton"
import DotsThreeIcon from "./icons/DotsThreeIcon"
import PlayIcon from "./icons/PlayIcon"
// import FastForwardIcon from "../icons/FastForwardIcon"
import PauseIcon from "./icons/PauseIcon"
import { buttonStyle } from "../utils"
import type { Color } from "../utils"
import './styles/IconButton.css'

type ControlButtonsProps = {
  color: Color
  isRunning: boolean
  toggleRunning: () => void
  onOptionsClick: () => void
  onSkipClick?: () => void
}

const ControlButtons = ({ 
  color, 
  isRunning, 
  toggleRunning,
  onOptionsClick,
  // onSkipClick
}: ControlButtonsProps) => {
  return (
        <div className="control-buttons">
          <IconButton
              icon={DotsThreeIcon}
              onClick={onOptionsClick}
              className={buttonStyle('secondary', color, 'medium')}
        />
        <IconButton
            icon={isRunning ? PauseIcon : PlayIcon}
            onClick={toggleRunning}
            className={buttonStyle('primary', color, 'large')}
        />
        {/* <IconButton
            icon={FastForwardIcon}
            onClick={onSkipClick}
            className={buttonStyle('secondary', color, 'medium')}
        /> */}
    </div>
  )
}
export default ControlButtons
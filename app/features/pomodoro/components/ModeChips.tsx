import Chip from "./Chip"
import BrainIcon from "./icons/BrainIcon"
import CoffeeIcon from "./icons/CoffeeIcon"
import './styles/ModeChip.css'

export const FocusChip = () => {
    return (
        <Chip
            icon={<BrainIcon size={20} className="icon" />}
            text="Focus"
            className="chip-red"
        />
    )
}

export const ShortBreakChip = () => {
    return (
        <Chip
            icon={<CoffeeIcon size={20} className="icon" />}
            text="Short Break"
            className="chip-green"
        />
    )
}

export const LongBreakChip = () => {
    return (
        <Chip
            icon={<CoffeeIcon size={20} className="icon" />}
            text="Long Break"
            className="chip-blue"
        />
    )
}
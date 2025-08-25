// src/components/Chip.tsx
import React from 'react'
import './styles/ModeChip.css'


type ChipProps = {
    icon: React.ReactNode
    text: string
    className?: string
}

const Chip: React.FC<ChipProps> = ({
    icon,
    text,
    className = '',
}) => {
    return (
        <div className={`chip ${className}`}>
            <span>{icon}</span>
            <span>{text}</span>
        </div>
    )
}

export default Chip
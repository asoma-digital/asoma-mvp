import type { IconProps } from './types/icon'

type IconButtonProps = {
    icon: React.FC<IconProps>
    iconColor?: string
    size?: number
    onClick?: () => void
    className?: string
}

const IconButton = ({
    icon: Icon,
    iconColor = 'currentColor',
    size,
    onClick,
    className = '',
}: IconButtonProps) => {
    
    const computedSize = size ?? (className.includes('small') ? 18 : 32);

    return (
        <button onClick={onClick} className={`icon-button ${className}`}>
            <Icon size={computedSize} color={iconColor} />
        </button>
    )
}

export default IconButton
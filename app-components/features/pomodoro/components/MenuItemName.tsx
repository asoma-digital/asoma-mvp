// src/components/MenuItemName.tsx
import { modeColorMap } from '../utils'
import type { MenuItemNameProps } from './types/menuItemName'

const MenuItemName = ({
    icon: Icon,
    menuItemNameString,
    mode,
}: MenuItemNameProps) => {
    const menuIconSize = 24
    const color = `var(--${modeColorMap[mode]}-alpha-900)`

    return (
        <div className="menu-item-name">
            <Icon size={menuIconSize} color={color} />
            <span style={{ color }}>{menuItemNameString}</span>
        </div>
    )
}

export default MenuItemName
// src/types/menuItemName.ts
import type { IconProps } from './icon'
import type { PomodoroMode } from './mode'

export type MenuItemNameProps = {
    icon: React.FC<IconProps>
    menuItemNameString: string
    mode: PomodoroMode
}
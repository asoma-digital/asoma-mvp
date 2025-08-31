import type { MenuItemNameProps } from './menuItemName'
import type { ShortcutProps } from './shortcut'
import type { PomodoroMode } from './mode'

export type MenuItemProps = {
  menuItemNameComponent: React.FC<MenuItemNameProps>
  shortcutComponent: React.FC<ShortcutProps>
  icon: MenuItemNameProps['icon']
  menuItemNameString: string
  keyName: string
  mode: PomodoroMode
  onClick: () => void
  display?: string
}
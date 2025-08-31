// src/components/Menu.tsx
import MenuItem from './MenuItem'
import MenuItemName from './MenuItemName'
import Shortcut from './Shortcut'

import GearSixIcon from './icons/GearSixIcon'
import ChartBarIcon from './icons/ChartBarIcon'
import KeyReturnIcon from './icons/KeyReturnIcon'

import type { PomodoroMode } from './types/mode'

type MenuProps = {
  mode: PomodoroMode
  onPreferencesClick: () => void
}

const Menu = ({ mode, onPreferencesClick }: MenuProps) => {
  return (
    <div className="menu">
      <MenuItem
        menuItemNameComponent={MenuItemName}
        shortcutComponent={Shortcut}
        icon={ChartBarIcon}
        menuItemNameString="Statistics"
        keyName="S"
        mode={mode}
        onClick={() => console.log('Statistics clicked')}
        display="none"
      />
      <MenuItem
        menuItemNameComponent={MenuItemName}
        shortcutComponent={Shortcut}
        icon={GearSixIcon}
        menuItemNameString="Preferences"
        keyName="P"
        mode={mode}
        onClick={onPreferencesClick}
      />
      <MenuItem
        menuItemNameComponent={MenuItemName}
        shortcutComponent={Shortcut}
        icon={KeyReturnIcon}
        menuItemNameString="Shortcuts"
        keyName="K"
        mode={mode}
        onClick={() => console.log('Shortcuts clicked')}
        display="none"
      />
    </div>
  )
}

export default Menu
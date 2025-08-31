import type { MenuItemProps } from './types/menuItem'

const MenuItem = ({
  menuItemNameComponent: MenuItemName,
  shortcutComponent: Shortcut,
  icon,
  menuItemNameString,
  keyName,
  mode,
  display,
  onClick
}: MenuItemProps) => {
  return (
    <div className="menu-item" onClick={onClick} style={{ display }}>
      <MenuItemName icon={icon} menuItemNameString={menuItemNameString} mode={mode} />
      <Shortcut keyName={keyName} mode={mode} />
    </div>
  )
}

export default MenuItem
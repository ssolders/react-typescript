import { FC, useState } from 'react'
import HeaderMenuItem from '../HeaderMenuItem/HeaderMenuItem'
import { IMenuItem } from '../../../Types/Header'
import './HeaderMenu.scss'

interface IProps {
  menuItems: Array<IMenuItem>
}

const HeaderMenu: FC<any> = (props: IProps) => {
  const [activePath, setActivePath] = useState(
    window.location.pathname.replace('/', '') // initial loaded path
  );

  const menuItemClickHandler = (id) => {
    setActivePath(id)
  }

  return (
    <div className="header-menu">
      { props.menuItems.map((menuItem, i) => {
        const { id, name, subMenuItems } = menuItem
        return <HeaderMenuItem key={i} id={id} name={name} subMenuItems={subMenuItems} active={activePath === id} clickHandler={menuItemClickHandler} />
      })}
    </div>
  )
}

export default HeaderMenu;

import { FC } from 'react'
import HeaderMenuItem, { IMenuItem } from '../HeaderMenuItem/HeaderMenuItem'
import './HeaderMenu.scss'

interface IProps {
  menuItems: Array<IMenuItem>
  activePath: string
  routeChangeHandler: (route: string) => {}
}

const HeaderMenu: FC<any> = (props: IProps) => {
  return (
    <div className="header-menu">
      { props.menuItems.map((menuItem, i) => {
        const { id, name, subMenuItems } = menuItem
        return <HeaderMenuItem key={i} id={id} name={name} subMenuItems={subMenuItems} active={props.activePath === id} clickHandler={props.routeChangeHandler} />
      })}
    </div>
  )
}

export default HeaderMenu;

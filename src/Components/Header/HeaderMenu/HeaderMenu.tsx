import { FC } from 'react'
import HeaderMenuItem, { IMenuItem } from '../HeaderMenuItem/HeaderMenuItem'
import './HeaderMenu.scss'

interface IProps {
  menuItems: Array<IMenuItem>
  outerClasses: string
  itemClasses: string
  activePath: string
  routeChangeHandler: (route: string) => {}
}

const HeaderMenu: FC<any> = (props: IProps) => {
  return (
    <div className={`header-menu ${props.outerClasses}`}>
      { props.menuItems.map((menuItem, i) => {
        const { id, label, subMenuItems } = menuItem
        return (
          <HeaderMenuItem
            key={i}
            id={id}
            name={label}
            subMenuItems={subMenuItems}
            active={props.activePath === id}
            itemClasses={props.itemClasses}
            clickHandler={props.routeChangeHandler} />
        ) 
      })}
    </div>
  )
}

export default HeaderMenu;

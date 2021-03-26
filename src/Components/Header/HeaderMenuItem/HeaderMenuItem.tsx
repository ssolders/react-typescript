import { FC } from 'react'
import { useHistory } from "react-router-dom"
import './HeaderMenuItem.scss'

export interface IMenuItem {
  id: string
  name: string
  subMenuItems?: Array<IMenuItem>
}

interface IProps {
  id: string
  name: string
  subMenuItems?: Array<IMenuItem>
  clickHandler: (id) => {}
  active: boolean
}

const HeaderMenuItem: FC<any> = (props: IProps) => {
  let __history = useHistory()
  const handleRouteChange = (id: string) => {
    props.clickHandler(id)
    return __history.push(`/${id}`)
  }

  const { id, name, active } = props
  return (
    <div className={`header-menu-item ${active ? 'active' : ''}`} onClick={() => handleRouteChange(id)}>
      <span id={id}>{ name }</span>
    </div>
  )
}

export default HeaderMenuItem

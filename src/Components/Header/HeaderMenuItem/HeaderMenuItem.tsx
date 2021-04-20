import { FC } from 'react'
import { useHistory } from "react-router-dom"
import Dropdown from './../../Form/Dropdown/Dropdown'
import './HeaderMenuItem.scss'

export interface IMenuItem {
  id: string
  label: string
  subMenuItems?: Array<IMenuItem>
}

interface IProps {
  id: string
  name: string,
  itemClasses: string
  subMenuItems?: Array<IMenuItem>
  clickHandler: (id) => {}
  active: boolean
}

const HeaderMenuItem: FC<any> = (props: IProps) => {
  let __history = useHistory()

  // we use the same route chnage handler for dropdown items as well
  const handleRouteChange = (option: IMenuItem) => {
    props.clickHandler(option.id)
    return __history.push(`/${option.id}`)
  }

  const { id, name, itemClasses, active, subMenuItems } = props
  const activeClasses = active ? 'bg-gray-900' : ''

  if (subMenuItems) {
    return (
      <Dropdown
        anchorType='menu'
        anchorContent={name}
        outerClasses='self-center'
        outerDropdownClasses='overflow-y-auto'
        onSelect={handleRouteChange}
        options={subMenuItems}>
      </Dropdown>
    )
  } else {
    return (
      <a
        href='#'
        onClick={() => handleRouteChange({ id, label: name })}
        className={`${activeClasses} ${itemClasses} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
          { name }
      </a>
    )   
  }
}

export default HeaderMenuItem

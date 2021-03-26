import { FC } from 'react'
import { useHistory } from "react-router-dom"
import { signOut } from './../../../Service/Login'
import Dropdown from './../../Form/Dropdown/Dropdown'
import './UserMenu.scss'

interface IProps {
  merchants: any
}

const UserMenu: FC<any> = (props: IProps) => {
  let history = useHistory()

  const handleDropdownSelect = (option) => {
    switch(option.id) {
      case 'signout':
        return handleSignout()
      default: 
        console.log(option)
    }
  }

  const handleSignout = async () => {
    const signedOut = await signOut()
    if (signedOut) {
      history.push('/login')
    }
  }

  const options = [
    { id: 'signout', label: 'Sign out' }
  ]

  return (
    <Dropdown
      outerClasses='overflow-y-auto self-center'
      outerDropdownClasses='overflow-y-auto'
      onSelect={handleDropdownSelect}
      options={options} />
  )

}

export default UserMenu

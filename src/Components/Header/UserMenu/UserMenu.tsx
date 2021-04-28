import { FC } from 'react'
import { useHistory } from "react-router-dom"
import { signOut } from '../../../Service/User'
import Dropdown from './../../Form/Dropdown/Dropdown'
import './UserMenu.scss'

interface IProps {
  merchants: any,
  handleSignin: (authenticated) => {}
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
    await signOut()
    props.handleSignin(false)
    history.push('/login')
  }

  const UserIcon = () => (
    <svg className='w-6 top-2 stroke-current text-gray-300' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )

  const options = [
    { id: 'account-settings', label: 'Settings' },
    { id: 'signout', label: 'Sign out' }
  ]
  // <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
  return (
    
    <Dropdown
      anchorType='icon'
      anchorContent={UserIcon}
      outerClasses='absolute self-center'
      outerDropdownClasses='overflow-y-auto'
      onSelect={handleDropdownSelect}
      options={options}>
    </Dropdown>
  )

}

export default UserMenu

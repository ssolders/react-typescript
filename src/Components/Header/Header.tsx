import { FC } from 'react'
import { useHistory } from "react-router-dom"
import HeaderMenu from './HeaderMenu/HeaderMenu'
import PaymentIQLogo from './../../assets/piq-logo.png'
import { IMenuItem } from './../../Types/Header'
import './Header.scss'

const Header: FC<any> = () => {
  let history = useHistory()

  const menuItems: Array<IMenuItem> = [
    { id: 'transactions', name: 'Transactions' },
    { id: 'approve', name: 'Approve' },
    { id: 'investigate', name: 'Investigate' },
    { id: 'user-accounts', name: 'User accounts' },
    { id: 'analytics', name: 'Analytics' },
    { id: 'kyc', name: 'KYC' },
    { id: 'store', name: 'Store' },
    { id: 'rules', name: 'Rules' },
    { id: 'admin', name: 'Admin' }
  ]

  const handleRouteChange = (route: string) => {
    return history.push(route)
  }

  return (
    <header className='app-header'>
      <div className='logo-layout-helper'>
        <img alt='piq-header' src={PaymentIQLogo} onClick={handleRouteChange('/')} />
      </div>

      <HeaderMenu menuItems={menuItems} />
      
      <div className='merchant-selector-menu' />
      <div className='user-menu' />
    </header>
  )
};

export default Header;
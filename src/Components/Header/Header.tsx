import { FC, useState } from 'react'
import { useHistory } from "react-router-dom"

import ApplicationLogo from './ApplicationLogo/ApplicationLogo'
import HeaderMenu from './HeaderMenu/HeaderMenu'
import MerchantDropdown, { IMerchantDropdownItem, IMerchantDropdownGroup } from './MerchantDropdown/MerchantDropdown'
import { IMenuItem } from './HeaderMenuItem/HeaderMenuItem'
import UserMenu from './UserMenu/UserMenu'
import { formatMerchantDataForDropdown } from './../../utils/helpers'
import MerchantData from './../../_MOCKED_DATA_/merchants.json'

import './Header.scss'

const Header: FC<any> = () => {
  let history = useHistory()

  const [activePath, setActivePath] = useState(
    window.location.pathname.replace('/', '') // initial loaded path
  );

  const routeChangeHandler = (route) => {
    setActivePath(route)
    return history.push(route)
  }

  /* Fetch from meta data? */
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

  const merchants: Array<IMerchantDropdownItem| IMerchantDropdownGroup> = formatMerchantDataForDropdown(MerchantData.allMerchants)

  return (
    <header className='app-header'>
      <ApplicationLogo routeChangeHandler={routeChangeHandler} />

      <HeaderMenu menuItems={menuItems} activePath={activePath} routeChangeHandler={routeChangeHandler} />
      
      <MerchantDropdown merchants={merchants} />
      <UserMenu />
    </header>
  )
};

export default Header;
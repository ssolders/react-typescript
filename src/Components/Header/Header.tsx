import { FC, useState } from 'react'
import { useHistory } from "react-router-dom"

import ApplicationLogo from './../Misc/ApplicationLogo/ApplicationLogo'
import HeaderMenu from './HeaderMenu/HeaderMenu'
import MerchantDropdown, { IMerchantDropdownItem, IMerchantDropdownGroup } from './MerchantDropdown/MerchantDropdown'
import { IMenuItem } from './HeaderMenuItem/HeaderMenuItem'
import UserMenu from './UserMenu/UserMenu'
import { formatMerchantDataForDropdown } from './../../utils/helpers'
import MerchantData from './../../_MOCKED_DATA_/merchants.json'
import './Header.scss'

interface IProps {
  handleSignin: (authenticated) => {}
  selectedMerchant: IMerchantDropdownItem | null
  handleSetMerchant: (merchant) => {}
}

const Header: FC<any> = (props: IProps) => {
  let history = useHistory()

  const [activePath, setActivePath] = useState(
    window.location.pathname.replace('/', '') // initial loaded path
  );

  const [menuOpen, setMenuOpen] = useState(false)

  const routeChangeHandler = (route) => {
    setActivePath(route)
    return history.push(route)
  }

  /* Fetch from meta data? */
  const menuItems: Array<IMenuItem> = [
    { id: 'transactions', label: 'Transactions' },
    { id: 'approve', label: 'Approve' },
    { id: 'investigate', label: 'Investigate' },
    { id: 'user-accounts', label: 'User accounts' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'kyc', label: 'KYC' },
    { id: 'store', label: 'Store' },
    { id: 'rules', label: 'Rules', subMenuItems: [
      { id: 'rules/payment-methods', label: 'Payment Methods' },
      { id: 'rules/routing', label: 'Routing' }
    ]},
    { id: 'admin', label: 'Admin', subMenuItems: [
      { id: 'configuration', label: 'Configuration' },
      { id: 'templates', label: 'Templates' }
    ]}
  ]

  const merchants: Array<IMerchantDropdownItem| IMerchantDropdownGroup> = formatMerchantDataForDropdown(MerchantData.allMerchants)

  return (
    <nav className='bg-purple-800'>
      <div className='max-w-8xl mx-auto px-2 md:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          
          <div className='absolute inset-y-0 left-0 flex items-center md:hidden'>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
              aria-controls='mobile-menu'
              aria-expanded='false'>
              
              <span className='sr-only'>Open main menu</span>
              <svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
              </svg>
              <svg className='hidden h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          <div className='flex-1 flex items-center justify-center md:items-stretch md:justify-start'>
            <div className='flex-shrink-0 flex items-center'>
              <ApplicationLogo classes='cursor-pointer' routeChangeHandler={routeChangeHandler} />
            </div>

            <div className='hidden flex-shrink-1 md:block md:ml-6'>
              <HeaderMenu menuItems={menuItems} activePath={activePath} routeChangeHandler={routeChangeHandler} />
            </div>
          </div>
          
          <MerchantDropdown merchants={merchants} selectedMerchant={props.selectedMerchant} handleSetMerchant={props.handleSetMerchant} />

          <div className='hidden md:block md:ml-6'>
            <UserMenu handleSignin={props.handleSignin} />
          </div>

        </div>
      </div>

      <div className='md:hidden' id='mobile-menu'>
        <div className={
              'px-2 pt-2 pb-3 space-y-1' +
              (menuOpen ? ' flex' : ' hidden')
            }>

          <HeaderMenu outerClasses='mx-auto' itemClasses='block px-3 py-2 rounded-md text-base font-medium' menuItems={menuItems} activePath={activePath} routeChangeHandler={routeChangeHandler} />

          <UserMenu />
        </div>
      </div>
      
    </nav>
  )
};

export default Header;
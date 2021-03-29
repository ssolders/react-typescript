import { FC, useState, useEffect } from 'react';
import Header from './Components/Header/Header'
import Routes from './Routes'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { IMerchantDropdownItem } from './Components/Header/MerchantDropdown/MerchantDropdown'
import './App.scss';

const App: FC<any> = () => {
  const getInitMerchant = () => {
    const storedMid = localStorage.getItem('piq-bo-selected-mid')
    if (storedMid) {
      debugger
      return JSON.parse(storedMid)
    } else {
      return null
    }
  }

  const getInitAuthStatus = () => {
    return localStorage.getItem('piq-bo-authenticated') === 'true'
  }


  const [selectedMid, setSelectedMid] = useState(getInitMerchant())
  const [authenticated, setAuthenticated] = useState(getInitAuthStatus())

  const handleLoginStatusChange = (authenticated) => {
    localStorage.setItem('piq-bo-authenticated', authenticated)
    setAuthenticated(authenticated)
  }

  const handleSetMerchant = (merchant: IMerchantDropdownItem) => {
    localStorage.setItem('piq-bo-selected-mid', JSON.stringify(merchant))
    setSelectedMid(merchant)
  }

  return (
    <Router history={'hashHistory'}>
        <div className="app">

          { authenticated &&
            <Header handleSignin={handleLoginStatusChange} selectedMerchant={selectedMid} handleSetMerchant={handleSetMerchant} />
          }

          <div className='content-container'>
            <Routes authenticated={authenticated} handleSignin={handleLoginStatusChange} />
          </div>
        </div>
      </Router>
  )
}

export default App;

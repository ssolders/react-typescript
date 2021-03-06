import { FC, useState, useEffect } from 'react';
import Header from './Components/Header/Header'
import Routes from './Routes'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { IMerchantDropdownItem } from './Components/Header/MerchantDropdown/MerchantDropdown'
import './App.scss';
import { getMetaData } from './Service/User';

const App: FC<any> = () => {
  const getInitMerchant = () => {
    const storedMid = localStorage.getItem('piq-bo-selected-mid')
    if (storedMid) {
      return JSON.parse(storedMid)
    } else {
      return { value: '0' }
    }
  }

  const getInitAuthStatus = async (): Promise<any> => {
    const data = await getMetaData(selectedMid.value)
    if (data) {
      console.log('INIT AUTH: ', true)
      localStorage.setItem('piq-bo-authenticated', 'true')
      setAuthenticated(true)
    } else {
      handleLoginStatusChange(false)
      console.log('INIT AUTH: ', false)
    }
  }

  const [selectedMid, setSelectedMid] = useState(getInitMerchant())
  const [authenticated, setAuthenticated] = useState(false)
  const [metaData, setMetaData] = useState(null)

  getInitAuthStatus()

  const handleLoginStatusChange = (authenticated) => {
    localStorage.setItem('piq-bo-authenticated', authenticated)
    setAuthenticated(authenticated)
  }

  const handleSetMerchant = async (merchant: IMerchantDropdownItem) => {
    localStorage.setItem('piq-bo-selected-mid', JSON.stringify(merchant))
    setSelectedMid(merchant)
    setMetaData(await getMetaData(merchant.value))
  }

  useEffect(() => {
    if (typeof authenticated === 'boolean') {
      
    }
  }, [authenticated])

  return (
    <Router history={'hashHistory'}>
      <div className="app">

        { authenticated &&
          <Header handleSignin={handleLoginStatusChange} selectedMerchant={selectedMid} handleSetMerchant={handleSetMerchant} />
        }

        <div className='content-container'>
          <Routes merchantId={selectedMid.value} authenticated={authenticated} handleSignin={handleLoginStatusChange} />
        </div>
      </div>
    </Router>
  )
}

export default App;

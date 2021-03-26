import React from 'react';
import Header from './Components/Header/Header'
import Routes from './Routes'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import './App.scss';


class App extends React.Component {
  componentDidMount () {
    // window.location.href = 'https://test-backoffice.paymentiq.io/paymentiq/oauth2/authorization/piq'
  }

  render() {
    return (
      <Router history={'hashHistory'}>
        <div className="app">
          <Header />
          <div className='content-container'>
            <Routes />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

import React from 'react';
import _PaymentIQCashier, { ApiMethodsType, CashierConfig } from 'paymentiq-cashier-bootstrapper'
import './App.css';


class App extends React.Component {

  componentDidMount () {
    const config: CashierConfig = {
      merchantId: '1337',
      userId: '123',
      sessionId: '66',
      environment: 'test', // if not set, defaults to production
      method: 'deposit' // if not set, defaults to deposit
    }

    new _PaymentIQCashier('#cashier', config,
      (api: ApiMethodsType) => {
        console.log('Cashier intialized and ready to take down the empire', api)
        console.log(api)
        api.css(`
          html { color: pink; }
        `)
        api.on({
          success: (data: any) => { console.log(data) }
        })
      }
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello world</h1>
        </header>
  
        <div id='cashier'></div>
      </div>
    );
  }
}

export default App;

import React, { FC } from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

const Routes: FC = () => {
  const constructLegacyUrl = (view: string): string => {
    const backofficeBaseUrl= 'http://0.0.0.0:11337/'
    const backofficeUrls = {
      transactions: '#transaction/search/',
      approve: '#approve/search/',
      investigate: '#T3-decisiontable/read/'
    }
  
    return `${backofficeBaseUrl}${backofficeUrls[view]}`
  }
  
  return (
    <Switch>
      <Route exact path="/">
        <h1>Home</h1>
      </Route>
      <Route path="/transactions">
        <iframe height='100%' width='100%' title='transactions' src={constructLegacyUrl('transactions')} />
      </Route>
      <Route path="/approve">
        <iframe height='100%' width='100%' title='approve' src={constructLegacyUrl('approve')} />
      </Route>
      <Route path="/investigate">
        <iframe height='100%' width='100%' title='investigate' src={constructLegacyUrl('investigate')} />
      </Route>
    </Switch>
  )
};

export default Routes;

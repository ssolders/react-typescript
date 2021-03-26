import React, { FC, Suspense, lazy } from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";

const Routes: FC = () => {
  const constructLegacyUrl = (view: string): string => {
    const backofficeBaseUrl= 'http://0.0.0.0:11337/'
    const backofficeUrls = {
      ['/']: '',
      transactions: '#transaction/search/',
      approve: '#approve/search/',
      investigate: '#T3-decisiontable/read/'
    }
  
    return `${backofficeBaseUrl}${backofficeUrls[view]}`
  }

  /* Legacy views that we still want to display from the old backoffice via iframe */
  const views = [
    { id: '/' },
    { id: 'transactions' },
    { id: 'approve' },
    { id: 'investigate' }
  ]

  const Login = (
    lazy(() => (
      import('./Views/Login/Login')
    ))
  )
  
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        { views.map(view => (
          <Route key={view.id} path={`/${view.id}`}>
            <iframe id='piq-iframe' height='100%' width='100%' title={view.id} src={constructLegacyUrl(view.id)} />
          </Route>  
        )) }

      </Switch>
    </Suspense>
  )
};

export default Routes;

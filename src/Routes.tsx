import { FC, Suspense, lazy } from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";
import { useHistory } from "react-router-dom"

interface Iview {
  id: string,
  legacyRoute: string
}

const views = [
  { id: '/', legacyRoute: '' },
  { id: 'transactions', legacyRoute: '#transaction/search/' },
  { id: 'approve', legacyRoute: '#approve/search/' },
  { id: 'investigate', legacyRoute: '#T3-decisiontable/read/' },
  { id: 'user-accounts', legacyRoute: '#user-psp-accounts/search/' },
  { id: 'kyc/search', legacyRoute: '#kyc/search/' },
  { id: 'kyc/block', legacyRoute: '#T16-decisiontable/read/' },
  { id: 'kyc/routing', legacyRoute: '#T15-decisiontable/read/' },
  { id: 'kyc/fallback', legacyRoute: '#T22-decisiontable/read/' },
  // { id: 'rules', legacyRoute: '#T3-decisiontable/read/' },
  { id: 'investigate', legacyRoute: '#T3-decisiontable/read/' }
]

interface IProps {
  merchantId: string
  authenticated: boolean
  handleSignin: () => {}
}

const Routes: FC<any> = (props: IProps) => {
  let history = useHistory()
  /* Catch when not authenticated - and route to login  */
  if (!props.authenticated) {
    history.push('/login')
  }

  const constructLegacyUrl = (view: Iview): string => {
    // const backofficeBaseUrl = 'http://test-bo.paymentiq.io:11337'
    const backofficeBaseUrl= `http://127.0.0.1:3337/`
    return `${backofficeBaseUrl}${view.legacyRoute}`
  }

  /* Legacy views that we still want to display from the old backoffice via iframe */

  const Login = (
    lazy(() => (
      import('./Views/Login/Login')
    ))
  )
  
  const PaymentMethodRules = (
    lazy(() => (
      import('./Views/Rules/PaymentMetodsRules/PaymentMetodsRules')
    ))
  )
  
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Switch>
        
        <Route exact path="/login">
          <Login handleSignin={props.handleSignin} />
        </Route>
        
        <Route exact path="/rules/payment-methods">
          <PaymentMethodRules merchantId={props.merchantId} />
        </Route>

        { views.map(view => (
          <Route key={view.id} exact path={`/${view.id}`}>
            <iframe id='piq-iframe' height='100%' width='100%' title={view.id} src={constructLegacyUrl(view)} />
          </Route>  
        )) }

      </Switch>
    </Suspense>
  )
};

export default Routes;

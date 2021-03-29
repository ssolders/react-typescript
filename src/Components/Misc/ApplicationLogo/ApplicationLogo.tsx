import { Fragment, FC } from 'react'
import PaymentIQLogo from './../../../assets/piq-logo.png'

interface IProps {
  routeChangeHandler: (route: string) => {},
  classes: string
}

const ApplicationLogo: FC<any> = (props: IProps) => {
  return (
    <Fragment>
      <img className={`hidden lg:block h-4 w-auto ${props.classes}`}alt='PaymentIQ' src={PaymentIQLogo} onClick={() => props.routeChangeHandler('/')} />
      <img className={`block lg:hidden h-4 w-auto ${props.classes}`} src={PaymentIQLogo} alt='PaymentIQ' onClick={() => props.routeChangeHandler('/')} />
    </Fragment>
  )
}

export default ApplicationLogo

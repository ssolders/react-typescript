import { FC } from 'react'
import PaymentIQLogo from './../../../assets/piq-logo.png'

interface IProps {
  routeChangeHandler: (route: string) => {}
}

const ApplicationLogo: FC<any> = (props: IProps) => {
  return (
    <div className='logo-layout-helper'>
      <img alt='piq-header' src={PaymentIQLogo} onClick={() => props.routeChangeHandler('/')} />
    </div>
  )
}

export default ApplicationLogo

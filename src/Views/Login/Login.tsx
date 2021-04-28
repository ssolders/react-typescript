import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { signIn, ISigninPayload } from '../../Service/User'
import ApplicationLogo from '../../Components/Misc/ApplicationLogo/ApplicationLogo'

interface ILoginProps {
  authenticated: boolean
  handleSignin: (authenticated) => {}
}

const Login: FC<any> = (props: ILoginProps) => {
  let history = useHistory()

  if (props.authenticated) {
    history.push('/')
  }

  return (
    <div className='min-h-screen bg-purple-900 flex flex-col justify-center sm:py-12'>
      <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
        <ApplicationLogo classes='h-12 mx-auto mb-8'/>
      </div>
    </div>
  )
}

export default Login
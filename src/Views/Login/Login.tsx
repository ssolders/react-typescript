import { FC, useState } from 'react'
import { useHistory } from "react-router-dom"
import { signIn, ISigninPayload } from './../../Service/Login'

const Login: FC<any> = (props) => {
  let history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const payload: ISigninPayload = {
      j_username: username,
      j_password: password
    }
    const signInResponse = await signIn(payload)
    if (signInResponse) {
      history.push(signInResponse.targetUrl)
    }
  }

  return (
    <div className='login container'>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label htmlFor='username'>Username</label>
        <input type='text' name='j_username' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <label htmlFor='password'>Password</label>
        <input type='password' name='j_username' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <input type='submit' name='Login' value='Login' />
      </form>
    </div>
  )
}

export default Login
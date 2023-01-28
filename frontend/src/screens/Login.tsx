// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'

export interface IUserLogin {
  loading: boolean;
  error: string | null;
  token: string | null;
}

/**
 * * Login Page
 * @returns {JSX.Element}
 */
const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {' '}
      Login{' '}
    </div>
  )
}

export default Login

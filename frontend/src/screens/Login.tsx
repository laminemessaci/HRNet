// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useAppDispatch } from '../app/storeTypes'
import Footer from '../components/Footer'
import Message from '../components/Message'
import { useLoginMutation } from '../features/authApiSlice'
import { IAuth, selectCurrentToken, setCredentials } from '../features/authSlice'
import useAuth from '../hooks/useAuth'
import usePersist from '../hooks/usePersist'

export interface IUserLogin {
  loading: boolean
  error: string | null
  token: string | null
}
interface IValues {
  email: string
  password: string
}

/**
 * * Login Page
 * @returns {JSX.Element}
 */
const Login: React.FC = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const token = useSelector(selectCurrentToken)
  // console.log('login', token)

  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const { roles } = useAuth()

  //  const userRef = useRef<HTMLInputElement | null>(null)

  const [login, { isLoading }] = useLoginMutation()
  // console.log(login)

  useEffect(() => {
    //  userRef.current.focus()
    if (token) {
      if (roles.includes('Employee')) {
        navigate('/user/home')
      } else {
        navigate('/home')
      }
    }
  }, [navigate, token, roles])

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('email is required!.').min(3, 'Must be greater than 5 characters.'),
    password: Yup.string()
      .required('Password is required.')
      .min(3, 'Must be greater than 5 characters.')
      .max(10, 'Must be smaller than 10 characters.'),
  })

  const initialValues: IValues = {
    email: '',
    password: '',
  }

  const handleToggle = () => setPersist((prev) => !prev)

  const handleSubmit = async (values: IValues) => {
    // const userNameRegular = '^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$'
    const userMail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const { email, password } = values
    const trimmedUsername: string = email.trim()
    const trimmedPassword: string = password.trim()
    // @ to  do control userName and password

    if (!trimmedUsername.match(userMail)) {
      setErrMsg('Invalid Username')
      return
    }
    try {
      const { accessToken }: IAuth = await login({ email: trimmedUsername, password: trimmedPassword }).unwrap()

      dispatch(setCredentials({ accessToken }))

      // navigate('/user/home')
    } catch (err: any) {
      if (!err.status) {
        setErrMsg('No Server Response')
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
      console.log('err', err)
    }
  }
  useEffect(() => {
    setErrMsg('')
  }, [navigate])

  return (
    <>
      <div className='relative  mx-8 justify-center min-h-screen  lg:flex-row  flex flex-col '>
        <div className='w-full p-2 m-auto bg-white rounded-md  shadow-xl lg:max-w-xl '>
          <div className='flex flex-row sm:mx-auto sm:w-full sm:max-w-md  justify-center'>
            <img className='mx-0 h-12 w-auto' src='/logo192.png' alt='HrNet' loading='lazy' />
            <h1 className='text-3xl font-semibold text-center text-lime-700 uppercase'>Sign in</h1>
          </div>
          {errMsg && <Message>{errMsg}</Message>}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: IValues) => handleSubmit(values)}
          >
            {({ resetForm }: any) => (
              <Form className='mt-6'>
                <div className='mb-2'>
                  <label htmlFor='email' className='block text-sm font-semibold text-gray-800'>
                    Email
                  </label>
                  <Field
                    id='email'
                    name='email'
                    type='email'
                    placeholder='Your Email address'
                    className='block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                  <ErrorMessage name='email' component='small' className='text-red-700' />
                </div>
                <div className='mb-2'>
                  <label htmlFor='password' className='block text-sm font-semibold text-gray-800'>
                    Password
                  </label>
                  <Field
                    type='password'
                    id='password'
                    placeholder=' Your Password'
                    name='password'
                    className='block w-full px-4 py-2 mt-2 text-teal-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40'
                  />
                  <ErrorMessage name='password' component='small' className='text-red-700' />
                  <div className='mt-4'>
                    <label htmlFor='persist' className='mt-6 '>
                      <input
                        className='w-4 h-4 text-green-700 bg-gray-100 border-gray-300 rounded focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                        type='checkbox'
                        id='persist'
                        onChange={handleToggle}
                        checked={persist}
                      />
                      &nbsp;Trust This Device
                    </label>
                  </div>
                </div>

                <a href='#' className='text-xs text-teal-600 hover:underline'>
                  Forget Password?
                </a>
                <div className='mt-6'>
                  <button
                    type='submit'
                    className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-700 rounded-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600'
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className='relative flex items-center justify-center w-full mt-6 border border-t'>
            <div className='absolute px-5 bg-white'>Or</div>
          </div>

          <p className='mt-8 text-xs font-light text-center text-gray-700'>
            Don&apos;t have an account?
            <a href='#' className='font-medium text-teal-600 hover:underline'>
              Sign up
            </a>
          </p>
        </div>
        <div className='p-2 m-auto  flex flex-col  relative w-full h-full lg:flex  items-center justify-center  bg-green-100  lg:max-w-xl rounded-md shadow-xl '>
          <img
            // src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
            src='logingreen.jpg'
            className='w-full'
            alt='Sample image'
          />
          <img className=' absolute  h-16  mb-16 w-auto' src='/logo192.ico' alt='HrNet' loading='lazy' />
          <strong className=' my-8 mb-0 max-w-md text-lg text-green-600 sm:text-xl md:mt-5 md:max-w-3xl'>
            manage your employees
          </strong>
        </div>

        {/* <div className=' flex flex-col hidden relative w-full h-full lg:flex  items-center justify-center m-auto bg-white  lg:max-w-xl min-h-screen '>
          <h1 className='text-3xl font-semibold text-center text-lime-700 uppercase mb-4'>HrNet</h1>
          <div className='w-90 h-80 rounded-full bg-gradient-to-tr from-lime-500 to-lime-900 animate-spin'>
            <img className='mx-0 h-12 w-auto' src='/logo192.png' alt='HrNet' />
          </div>
          <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg' />
        </div> */}
      </div>
      <Footer />
    </>
  )
}

export default Login

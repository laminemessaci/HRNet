import { faAdd, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useAuth from '../hooks/useAuth'
import EmployeeDash from './employee/EmployeeDash'

const Home = () => {
  const { status } = useAuth()
  console.log(status)
  if (status == 'Employee') {
    return <EmployeeDash />
  }
  return (
    <main className='w-full h-screen flex flex-col justify-start gap-12 items-center my-16'>
      <section className='w-11/12 lg:h-[500px] flex-1 gap-4 sm:flex lg:flex-row  flex flex-col  sm:justify-center items-center sm:border sm:border-gray-200 sm:rounded-lg '>
        <div className='mx-auto  sm:pt-16 sm:pb-20 text-center lg:py-48 lg:text-left'>
          <div className='sm:justify-center lg:justify-start md:justify-center'>
            <img className='mx-auto lg:h-40  w-auto' loading='lazy' src='/logo192.ico' alt='HrNet-logo' />
          </div>
          <div className='px-4 sm:px-8 lg:w-11/12 xl:pr-16'>
            <h1 className='text-xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl '>
              <span className='block xl:inline text-green-600'>HRNet the app that manage </span>{' '}
              <span className='block text-green-600 xl:inline'>your employees</span>
            </h1>
            <p className='mx-auto mt-3 max-w-md text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl'>
              manage your employee list
            </p>
            <div className='mt-10 sm:flex sm:justify-center lg:justify-start'>
              <div className='rounded-md shadow'>
                <a
                  href='/home/new-employee'
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-green-600 px-8 py-3  text-base font-medium text-white hover:bg-green-700 md:py-4 md:px-10 md:text-lg'
                >
                  <FontAwesomeIcon className='border-green-200' icon={faAdd} color='white' />
                  &nbsp;Create
                </a>
              </div>
              <div className='mt-3 rounded-md shadow sm:mt-0 sm:ml-3'>
                <a
                  href='/home/employees-list'
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-green-600 hover:bg-green-200 md:py-4 md:px-10 md:text-lg'
                >
                  <FontAwesomeIcon className='bg-green-600  rounded' icon={faEye} color='white' />
                  &nbsp;View
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className=' h-64 w-full sm:h-72 md:h-96  lg:h-full lg:w-1/2'>
          <picture>
            <source type='image/webp' />
            <img loading='lazy' className=' h-full w-full object-cover rounded-r-lg p-0  ' src={'/home.jpg'} alt='natural' />
          </picture>
        </div>
      </section>
      {/* <div className='h-12 w-full bg-white'></div> */}
    </main>
  )
}

export default Home

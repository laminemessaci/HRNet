import { FaBackward } from 'react-icons/fa'
import { Link } from 'react-router-dom'

/**
 * *Error Page
 * @returns {JSX.Element}
 */
const ErrorPage: React.FC = (): JSX.Element => {
  // return (
  //   <main className=" bg-green-500 w-full h-screen flex justify-center flex-col">
  //     <p className="text-9xl text-white font-extrabold flex justify-center">
  //       404
  //     </p>

  //     <p className="text-2xl text-white font-extrabold flex justify-center">
  //       Oups ! The page you are requesting does not exist.
  //     </p>

  //     <Link
  //       className="text-lg text-white font-extrabold flex justify-center mt-11"
  //       to="/"
  //     >
  //       <FaBackward className="w-8 h-8 mx-2" /> Back to the home page
  //     </Link>
  //   </main>
  // )
  return (
    <main className='relative h-screen overflow-hidden bg-green-900 flex justify-center items-center'>
      <img src='logo192.ico' className='absolute object-center md:object-center' />
      <div className='absolute inset-0 bg-black opacity-25'></div>
      <div className='container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40'>
        <div className='relative z-10 flex flex-col items-center w-full font-mono'>
          <h1 className='mt-4 text-5xl font-extrabold leading-tight text-center text-white'>You&#x27;re alone here</h1>
          <p className='font-extrabold text-white text-8xl my-44 animate-bounce'>404</p>
          <Link className='text-lg text-white font-extrabold flex justify-center mt-11' to='/'>
            <FaBackward className='w-8 h-8 mx-2'></FaBackward>Back to the home page
          </Link>
        </div>
      </div>
    </main>
  )
}

export default ErrorPage

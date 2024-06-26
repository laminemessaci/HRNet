import React from 'react'

interface IPropsChild {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

/**
 ** Drawer 
 * @param children 
 * @param isOpen  state
 * @param setIsOpen  callBack 
 * @returns 
 */

const Drawer: React.FC<IPropsChild> = ({ children, isOpen, setIsOpen }): JSX.Element => {
  return (
    <main
      className={
        ' fixed overflow-hidden z-10 bg-lime-800 bg-opacity-25 inset-0 transform ease-in-out ' +
        (isOpen
          ? ' transition-opacity opacity-100 duration-500 translate-x-0  '
          : ' transition-all delay-500 opacity-0 translate-x-full  ')
      }
    >
      <section
        className={
          ' w-screen max-w-lg right-0 absolute bg- h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' +
          (isOpen ? ' translate-x-0 ' : ' translate-x-full ')
        }
      >
        <article className='relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full'>
          {/* <header className='p-4 font-bold text-lg flex justify-center'>Header</header> */}
          {children}
        </article>
      </section>
      <section
        className=' w-screen h-full cursor-pointer '
        onClick={() => {
          setIsOpen(false)
        }}
      ></section>
    </main>
  )
}

export default Drawer

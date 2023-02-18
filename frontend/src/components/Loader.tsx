import React from 'react'
import ReactLoading, { LoadingType } from 'react-loading'

/**
 * Component that displays a Loader
 *
 * @param   {string}  type   type of  loader
 * @param   {string}  color  loader color
 * @param   {string}  width   Dimensions
 * @param   {string}  height  Dimensions
 *
 * @return {JSX.Element}
 */

interface ILoader {
  type: LoadingType
  color: string
  width?: string | number
  height?: string | number
}

/**
 ** Loader components
 * @param  {LoadingType}
 * @param  {string}
 * @param { string|number}
 * @param {string| number}
 * @returns {JSX.Element}
 */
const Loader: React.FC<ILoader> = ({ type, color, width, height }: ILoader): JSX.Element => {
  return (
    <main className='flex items-center justify-center w-full sm:w-2/5 mx-auto h-screen '>
      <ReactLoading type={type} color={color} width={width} height={height} />
    </main>
  )
}

export default Loader

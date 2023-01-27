interface IProps {
  variant?: string
  children: React.ReactNode
}

/**
 ** Message Component
 * @param {string}
 * @param { React.ReactNode}
 * @returns {JSX.Element}
 */
const Message: React.FC<IProps> = ({ variant, children }: IProps): JSX.Element => {
  return (
    <div className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800' role={variant}>
      <span className='font-medium'>{children}</span>
    </div>
  )
}

export default Message

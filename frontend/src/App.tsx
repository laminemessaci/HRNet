import Navigation from './navigation'
import ToastProvider from './notifications/ToastProvider'

const App: React.FC = (): JSX.Element => {
  return (
    <ToastProvider variant={'top_left'}>
      <Navigation />
    </ToastProvider>
  )
}

export default App

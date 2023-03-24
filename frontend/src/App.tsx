import { lazy } from 'react'

const Navigation = lazy(() => import('./navigation'))
const ToastProvider = lazy(() => import('./notifications/ToastProvider'))

const App: React.FC = (): JSX.Element => {
  return (
    <ToastProvider variant={'top_left'}>
      <Navigation />
    </ToastProvider>
  )
}

export default App

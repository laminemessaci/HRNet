import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './app/store'
import './index.css'

import 'react-datepicker/dist/react-datepicker.css'

if (process.env.NODE_ENV === 'production') disableReactDevTools()


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

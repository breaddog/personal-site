import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'

import store from './store'

import { App } from './App'
import { Provider } from 'react-redux'
import { Web3ContextProvider } from './ethereum'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <React.StrictMode>
  <>
    <Web3ContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </Web3ContextProvider>

    <ToastContainer
      position='bottom-left'
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      theme='dark'
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={true}
    />
  </>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

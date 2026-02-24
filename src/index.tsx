import ReactDOM from 'react-dom/client'
import './index.scss'

import store from './store'

import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { App } from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <React.StrictMode>
  <>
    <Provider store={store}>
      <App />
    </Provider>

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

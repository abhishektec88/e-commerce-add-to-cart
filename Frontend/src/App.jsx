import './App.css'
import Header from './Component/Header'
import { AuthProvider } from './Context/AuthProvider'
import { AppRoute } from './Route'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <>
    <Provider store={store}>
    <AuthProvider>
        <AppRoute />
        <ToastContainer theme='colored'/>
      </AuthProvider>
    </Provider>
    </>
  )
}

export default App

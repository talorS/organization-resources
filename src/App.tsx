import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router'

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='grid h-screen grid-rows-[auto_1fr_auto]'> {/* Grid da página toda */}
          <div className='flex w-full justify-center p-3 text-base bg-amber-100'>Navbar</div>
          <Routes>
            <Route path='/login' element={<Login />} />
          </Routes>
          <div className='flex w-full justify-center text-base p-6 bg-amber-100'>Footer</div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

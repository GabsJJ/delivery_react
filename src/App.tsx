import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Home from './pages/Home';
import { AuthProvider } from './contexts/AuthContext/AuthProvider'
import { CartProvider } from './contexts/CartContext/CartProvider';  // ✅ importa aqui
import AuthLayout from './layouts/AuthLayout';
import DefaultLayout from './layouts/DefaultLayout';

function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* ✅ envolve toda a árvore com o provider */}
        <BrowserRouter>
          <div className='grid h-screen grid-rows-[auto_1fr_auto]'> {/* Grid da página toda */}
            <Routes>
              <Route element={ <AuthLayout /> }>
                <Route path='/login' element={<Login />} />
              </Route>

              <Route element={ <DefaultLayout /> }>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App;
